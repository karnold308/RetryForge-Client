import { useState, ChangeEvent, useEffect } from "react";
import type { LostMMR } from '../models/types'
import { Link } from 'react-router-dom'
import { formatCurrency, formatCompactNumber, formatLargeNumber } from "../utils/formatters"



export default function Calculator() {
    const [inputMMRValue, setInputMMRValue] = useState<number>(50500);
    const [inputFailedRate, setInputFailedRate] = useState<number>(8);
    const [inputRecovRate, setInputRecovRate] = useState<number>(25);
    const [calcResult, setCalcResult] = useState<LostMMR | null>(null);
    const mmrMin = 5000;
    const mmrMax = 100000;
    const failMin = 5;
    const failMax = 15;
    const recovMin = 10;
    const recovMax = 30;

    const calc = () => {
        const failureRate = inputFailedRate / 100;
        const recoveryRate = inputRecovRate / 100;
        const feeRate = 0.05;
        const failRevenue = Number(inputMMRValue) * failureRate;
        const weRecov = failRevenue * recoveryRate;
        const ourFee = 49 + weRecov * feeRate;
        const totalGain = weRecov - ourFee;

        setCalcResult({
            mrr: Number(inputMMRValue),
            failedRevenue: failRevenue,
            recoverable: weRecov,
            weRecover: weRecov,
            weCharge: ourFee,
            netGain: Math.round(totalGain)
        })
    }

    const handleMMRChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputMMRValue(Number(event.target.value));
    }

    const handleFailedRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputFailedRate(Number(event.target.value));
    }

    const handleRecovRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputRecovRate(Number(event.target.value));
    }


    useEffect(() => {
        calc();
    }, [inputMMRValue, inputFailedRate, inputRecovRate]);


    return (
        <>
            <section className="max-w-6xl mx-auto xs:py-6 xs:pl-4 xs:pr-4 md:pb-12 border-t border-gray-200/70">
                <div>
                    <h2 className="text-6xl md:text-6xl font-normal text-left mb-6
                        xs:text-4xl xs:tracking-tighter">
                        See how much revenue you could recover
                    </h2>
                    <p>Estimate lost subscription revenue and project how much RetryForge can recover automatically.</p>
                </div>
                <div id="calculator" className="px-8 grid md:grid-cols-2 gap-12 items-center md:pb-12 md:pt-12
                    bg-white border border-gray-200 rounded-[20px] max-w-7xl mx-auto mb-10 scroll-mt-[220px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.06)]
                    xs:pt-4">
                    <div>
                        <p className="">
                            Interactive Revenue Leak Estimator
                        </p>
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold">
                                    Monthly Subscription Revenue</label>
                                <span className="text-gray-900 font-bold text-indigo-600">${formatCurrency(inputMMRValue)}</span>
                            </div>
                            <div className="grid grid-cols-[60px_1fr_60px] items-center gap-4 w-full">
                                <span className="text-sm text-gray-500">$5k</span>
                                <input
                                    id="mrr" className="w-full accent-indigo-600 appearance-none bg-gray-200 h-2 rounded-full outline-none" type="range" min={mmrMin} max={mmrMax} step="250" value={inputMMRValue} onChange={handleMMRChange}
                                />
                                <span className="text-sm text-gray-500">$100k</span>
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold">
                                    Failed Payment Rate</label>
                                <span className="text-gray-900 font-bold text-indigo-600">{inputFailedRate}%</span>
                            </div>
                            <div className="grid grid-cols-[60px_1fr_60px] items-center gap-4 w-full">
                                <span className="text-sm text-gray-500">5%</span>
                                <input
                                    type="range" className="w-full accent-indigo-600 appearance-none bg-gray-200 h-2 rounded-full outline-none" min={failMin} max={failMax} onMouseUp={() => handleFailedRateChange} step="1" value={inputFailedRate} onChange={handleFailedRateChange}
                                />
                                <span className="text-sm text-gray-500">15%</span>
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center">
                                <label className="font-semibold">
                                    Recovery Rate</label>
                                <span className="text-gray-900 font-bold text-indigo-600">{inputRecovRate}%</span>
                            </div>
                            <div className="grid grid-cols-[60px_1fr_60px] items-center gap-4 w-full">
                                <span className="text-sm text-gray-500">10%</span>
                                <input
                                    type="range" className="w-full accent-indigo-600 appearance-none bg-gray-200 h-2 rounded-full outline-none" min={recovMin} max={recovMax} step="1" onMouseUp={() => handleRecovRateChange} value={inputRecovRate} onChange={handleRecovRateChange}
                                />
                                <span className="text-sm text-gray-500">30%</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {101 <= (null !== calcResult ? calcResult.netGain * 12 : 0) &&
                            <div className="heroProfitCard bg-white border border-gray-200 rounded-2xl p-6 shadow-sm
                                xs:pl-4 xs:pr-4">
                                <div className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-bold mb-3">
                                    Silent revenue leak
                                </div> 
                                <br>
                                </br>
                                <p className="inline-flex  py-1 text-sm font-medium mb-3 uppercase">
                                    Revenue lost to failed payments
                                </p><br></br>
                                <h3 className="inline-block -tracking-[0.5px] text-gray-500 md:text-7xl font-extrabold text-gray-900 
                                    wrap-anywhere break-words xs:text-4xl">
                                    -${null != calcResult ? formatLargeNumber(calcResult.failedRevenue) : 0}<span className="inline-block text-2xl tracking-widest text-gray-500 font-semibold">/yr</span>
                                </h3>
                                <p className="m-0 text-[15px] leading-[1.7] text-gray-600 max-w-[420px] mt-4">
                                    Most SaaS companies never notice this revenue leak.
                                </p>
                                <div className="mt-6">
                                    <p className="mb-2.5 text-sm font-semibold text-gray-700">
                                        RetryForge could automatically recover
                                    </p>
                                    <strong className="block text-4xl leading-none -tracking-[2px] font-extrabold text-emerald-600">
                                        +${null != calcResult ? formatCompactNumber(calcResult.recoverable) : 0}/yr
                                    </strong>
                                    <p className="mt-2.5 text-sm text-gray-500">
                                        ≈ +${null != calcResult ? formatCurrency(calcResult.netGain) : 0}/mo net after fees
                                    </p>
                                </div>
                            </div>
                        }
                        {101 > (null !== calcResult ? calcResult.netGain * 12 : 0) &&
                            <Link to="/signup" className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                                style={{ width: "165px" }}>
                                See your custom recovery plan
                            </Link>
                        }
                        <p className="mt-2">
                            Recovery rates vary depending on timing and customer behavior.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}