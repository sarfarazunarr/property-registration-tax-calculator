"use client";
import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import Form from 'next/form'
import { CalculationData } from '@/types/all';
import { cityData } from '@/data/city';
import Link from 'next/link';

const CityMainComponent = () => {
    const [calculation, setCalculation] = useState<CalculationData>()

    async function sendData(formData: FormData) {
        const data = cityData.find(obj => obj.area === formData.get('city') && obj.type == formData.get('pr_type'));
        const sqftValue = data?.value;
        const areaString = formData.get('area') as string | null;
        const area = areaString ? Number.parseFloat(areaString) : 0;
        const valuation = sqftValue ? sqftValue * area : 0;
        const onePercent = valuation / 100;
        const estamp = onePercent * 2;
        const ktax = formData.get('purchaser_status') == "Active" ? onePercent * 3 : (formData.get('purchaser_status') == "Active (Late Filer)" ? onePercent * 6 : formData.get('purchaser_status') == "Inactive" ? onePercent * 12 : 0)
        const ctax = formData.get('seller_status') == "Active" ? onePercent * 3 : (formData.get('seller_status') == "Active (Late Filer)" ? onePercent * 6 : formData.get('seller_status') == "Inactive" ? onePercent * 10 : 0)
        const finalData: CalculationData = {
            perUnitValue: sqftValue || 0,
            valuation: valuation,
            estamp: estamp,
            ktax: ktax,
            ctax: ctax,
            mcTax: onePercent,
            area: `${area} SQFTs`,
            deh: `City: ${formData.get('city')} Type: ${formData.get('pr_type')}`,
            totalTax: estamp + ktax + ctax + onePercent
        }
        setCalculation(finalData)
    }
    return (
        <div className='container'>
            <div className='shortarea'>
                <h4>Provide Correct Data</h4>
                <Form action={sendData}>
                    <Input label='Select City' name='city' placeholder='Select City' data={["saeedabad", "hala", "matiari", "bhitshah"]} />
                    <Input label='Property Type' name='pr_type' placeholder='Select Type' data={["OPEN PLOT", "HOUSE", "COMMERCIAL PLOT", "SHOP", "INDUSTRIAL"]} />
                    <Input label='Area (SQFT)' name='area' placeholder='Enter Area' select={false} />
                    <Input label='Seller Filer Status' name='seller_status' placeholder='Select Status' data={["Inactive", "Active (Late Filer)", "Active"]} />
                    <Input label='Purchaser Filer Status' name='purchaser_status' placeholder='Select Status' data={["Inactive", "Active (Late Filer)", "Active"]} />
                    <div className='w-full flex justify-between'>
                        <Button type='primary' variant='default' text='Calculate' btnType='submit' />
                        <Link href={"/"} className='primary default' style={{textDecoration: "none"}}>Land Valuation</Link>
                    </div>
                </Form>
            </div>
            <div className='shortarea'>
                <h4>Output Data</h4>

                {calculation && <table>
                    <tbody>
                        <tr>
                            <td>Address</td>
                            <td>{calculation.deh}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>{calculation.area}</td>
                        </tr>
                        <tr>
                            <td>Unit Value</td>
                            <td>Rs.{calculation.perUnitValue}</td>
                        </tr>
                        <tr>
                            <td>Valuation</td>
                            <td>Rs.{calculation.valuation}</td>
                        </tr>
                        <tr>
                            <td>Estamp</td>
                            <td>Rs.{calculation.estamp}</td>
                        </tr>
                        <tr>
                            <td>K-Tax</td>
                            <td>Rs.{calculation.ktax}</td>
                        </tr>
                        <tr>
                            <td>C-Tax</td>
                            <td>Rs.{calculation.ctax}</td>
                        </tr>
                        <tr>
                            <td>MC Tax</td>
                            <td>Rs.{calculation.mcTax}</td>
                        </tr>
                        <tr>
                            <td>Total Tax</td>
                            <td>Rs.{calculation.totalTax}</td>
                        </tr>
                    </tbody>
                </table>}
                {!calculation && <p className='text-sm text-gray-500 py-5'>Data will display here...</p>}

            </div>
        </div>
    )
}

export default CityMainComponent
