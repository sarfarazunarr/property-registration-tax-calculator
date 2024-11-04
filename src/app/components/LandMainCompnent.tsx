"use client";
import React, { useState } from 'react'
import Input from './Input'
import { dehnames, landData } from '@/data/land'
import Button from './Button'
import Form from 'next/form'
import { CalculationData } from '@/types/all';
import Link from 'next/link';

const LandMainCompnent = () => {
    const dehdata: string[] = dehnames();
    const [calculation, setCalculation] = useState<CalculationData>()

    async function sendData(formData: FormData) {
        const data = landData.find(obj => obj.Deh === formData.get('deh'));
        const ghuntaValue = data?.Ghunta;
        const areaString = formData.get('area') as string | null;
        const area = areaString ? Number.parseFloat(areaString) : 0;
        const valuation = ghuntaValue ? ghuntaValue * area : 0;
        const onePercent = valuation / 100;
        const estamp = onePercent * 2;
        const ktax = formData.get('purchaser_status') == "Active" ? onePercent * 3 : (formData.get('purchaser_status') == "Active (Late Filer)" ? onePercent * 6 : formData.get('purchaser_status') == "Inactive" ? onePercent * 12 : 0)
        const ctax = formData.get('seller_status') == "Active" ? onePercent * 3 : (formData.get('seller_status') == "Active (Late Filer)" ? onePercent * 6 : formData.get('seller_status') == "Inactive" ? onePercent * 10 : 0)
        const acre = Math.trunc(area / 40)
        const ghuntas = area - (acre * 40);
        const finalData: CalculationData = {
            perUnitValue: ghuntaValue || 0,
            valuation: valuation,
            estamp: estamp,
            ktax: ktax,
            ctax: ctax,
            mcTax: onePercent,
            area: `${acre} Acres ${ghuntas} Ghuntas`,
            deh: data?.Deh || "Not Available",
            totalTax: estamp + ktax + ctax + onePercent
        }
        setCalculation(finalData)
    }
    return (
        <div className='container'>
            <div className='shortarea'>
                <h4>Provide Correct Data</h4>
                <Form action={sendData}>
                    <Input label='Select Deh' name='deh' placeholder='Select Deh' data={dehdata} />
                    <Input label='Area (Ghuntas)' name='area' placeholder='Enter Area' select={false} />
                    <Input label='Seller Filer Status' name='seller_status' placeholder='Select Status' data={["Inactive", "Active (Late Filer)", "Active"]} />
                    <Input label='Purchaser Filer Status' name='purchaser_status' placeholder='Select Status' data={["Inactive", "Active (Late Filer)", "Active"]} />
                    <div className='w-full flex justify-between'>
                        <Button type='primary' variant='default' text='Calculate' btnType='submit' />
                        <Link href={"/city"} className='primary default' style={{textDecoration: "none"}}>City Valuation</Link>
                    </div>
                </Form>
            </div>
            <div className='shortarea'>
            <h4>Output Data</h4>

                {calculation && <table>
                    <tbody>
                        <tr>
                            <td>Deh</td>
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

export default LandMainCompnent
