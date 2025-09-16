import React, { useState } from 'react'
import { Modal } from "@/components/ui/modal"
import { google } from "googleapis"
import fs from "fs/promises"
import path from "path"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Representitive = {
    id: number
    name: string
    division: string
    district: string
    location: string
    phone: number
}

type GetSholoProps = {
    representitives: Representitive[] | null
}

function enToBnNumber(input: string | number): string {
    const bnDigits = '০১২৩৪৫৬৭৮৯'
    const enDigits = '0123456789'
    return input
        .toString()
        .split('')
        .map(char => {
            const idx = enDigits.indexOf(char)
            return idx > -1 ? bnDigits[idx] : char
        })
        .join('')
}

const ProductImageModal = ({
    isOpen,
    onOpenChange,
    product
}: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    product: { images: string[], title: string }
}) => (
    <Modal isOpen={isOpen} onClose={onOpenChange} className="max-w-2xl">

        {product.images.length > 0 && (
            <div className="flex space-x-2 mb-4">
                {product.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`${product.title} image ${idx + 1}`}
                        className="w-full h-auto rounded-lg object-contain"
                        style={{ maxHeight: "80vh" }}
                    />
                ))}
            </div>
        )}
    </Modal>
)

const RepresentitiveDropdown = ({
    representitives,
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
}: {
    representitives: Representitive[]
    selectedDivision: string
    setSelectedDivision: (division: string) => void
    selectedDistrict: string
    setSelectedDistrict: (district: string) => void
}) => {
    // Get unique divisions
    const divisions = [...new Set(representitives.map(r => r.division))]

    // Filter districts based on selected division
    const filteredDistricts = selectedDivision
        ? [...new Set(representitives.filter(r => r.division === selectedDivision).map(r => r.district))]
        : []

    // Handle division change: reset district
    const handleDivisionChange = (value: string) => {
        setSelectedDivision(value)
        setSelectedDistrict("") // Reset district when division changes
    }

    // Handle district change
    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value)
    }

    return (
        <div className="mb-6 font-body">
            <label htmlFor="division-select" className="block mt-4 mb-2 font-display">
                বিভাগ
            </label>
            <Select
                value={selectedDivision}
                onValueChange={handleDivisionChange}
                disabled={divisions.length === 0}
            >
                <SelectTrigger id="division-select" className="w-full">
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                    {divisions.map(division => (
                        <SelectItem key={division} value={division}>
                            {division}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <label htmlFor="district-select" className="block mb-2 font-display mt-4">
                জেলা
            </label>
            <Select
                value={selectedDistrict}
                onValueChange={handleDistrictChange}
                disabled={!selectedDivision || filteredDistricts.length === 0}
            >
                <SelectTrigger id="district-select" className="w-full">
                    <SelectValue placeholder="জেলা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                    {filteredDistricts.map(district => (
                        <SelectItem key={district} value={district}>
                            {district}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default function GetSholo(props: GetSholoProps) {
    const { representitives } = props

    const [selectedDivision, setSelectedDivision] = useState<string>("")
    const [selectedDistrict, setSelectedDistrict] = useState<string>("")
    const [searchTerm, setSearchTerm] = useState("")

    const [isProductImageModalOpen, setProductImageModalOpen] = useState(false)
    const [product, setProduct] = useState<{ images: string[], title: string }>({ images: [], title: "" })

    const products = [{
            type: "magazine",
            SKU: "MAG-9",
            price: 60,
            images: [
                "https://cms.sholo.info/wp-content/uploads/2025/09/Sholo-July-Cover-FInal-small.png",
                "https://cms.sholo.info/wp-content/uploads/2025/09/Sholo-July-ondormohol-small.png"
            ],
            title: "জুলাই অভ্যুত্থান সংখ্যা"
        },
        {
            type: "magazine",
            SKU: "MAG-9",
            price: 50,
            images: [
                "https://cms.sholo.info/wp-content/uploads/2025/07/sholo-9.jpg",
            ],
            title: "৯ম সংখ্যা"
        },
        {
            type: "magazine",
            SKU: "MAG-8",
            price: 50,
            images: [
                "https://cms.sholo.info/wp-content/uploads/2025/07/sholo-8.jpg",
            ],
            title: "৮ম সংখ্যা"
        },
        {
            type: "tshirt",
            SKU: "TSHIRT-1",
            price: 350,
            images: [
                "https://cms.sholo.info/wp-content/uploads/2025/07/Sholo-T-shirt.jpg",
            ],
            title: "টি-শার্ট"
        },
    ]

    if (!representitives) {
        return <div>No data found</div>
    }

    // Filter representatives for selected division and district
    const filteredRepresentitives =
        selectedDivision && selectedDistrict
            ? representitives.filter(
                r => r.division === selectedDivision && r.district === selectedDistrict
            ).sort((a, b) => a.location.localeCompare(b.location))
            : []

    return (
        <div className='max-w-5xl mx-auto py-4 px-6 sm:px-8'>
            <h1 className='mt-8 text-left'>প্রাপ্তিস্থান</h1>
            <ProductImageModal
                isOpen={isProductImageModalOpen}
                onOpenChange={() => setProductImageModalOpen(false)}
                product={product}
            />
            <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-6 mt-8">
                <div>
                    <RepresentitiveDropdown
                        representitives={representitives}
                        selectedDivision={selectedDivision}
                        setSelectedDivision={setSelectedDivision}
                        selectedDistrict={selectedDistrict}
                        setSelectedDistrict={setSelectedDistrict}
                    />

                    {/* Show filtered representatives only if both division and district are selected */}
                    {selectedDivision && selectedDistrict && (
                        <div className="my-8 max-w-4xl mx-auto">
                            <h2 className="text-xl font-bold mb-4">এই জেলায় প্রতিনিধিরা</h2>
                            {/* Quick search filter */}
                            <input
                                type="text"
                                placeholder="প্রতিনিধির নাম, লোকেশন বা ফোন নম্বর দিয়ে খুঁজুন"
                                className="mb-4 w-full px-3 py-2 border rounded"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            {filteredRepresentitives
                                .filter(rep =>
                                    rep.name.includes(searchTerm) ||
                                    rep.location.includes(searchTerm) ||
                                    ("" + rep.phone).includes(searchTerm)
                                ).length > 0 ? (
                                <ul className="space-y-4 m-0 p-0 list-none">
                                    {filteredRepresentitives
                                        .filter(rep =>
                                            rep.name.includes(searchTerm) ||
                                            rep.location.includes(searchTerm) ||
                                            ("" + rep.phone).includes(searchTerm)
                                        )
                                        .map(rep => (
                                            <li key={rep.id} className="border rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                                                <div>
                                                    <div className="font-semibold">{rep.location}</div>
                                                    <div className="text-sm text-gray-600">{rep.name}</div>
                                                </div>
                                                <div className="text-sm mt-2 sm:mt-0">
                                                    ফোন: <a href={`tel:${"+880" + rep.phone}`} className="text-blue-600">{"0" + rep.phone}</a>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <div>এই জেলায় কোনো প্রতিনিধি পাওয়া যায়নি।</div>
                            )}
                            <div className='font-body text-sm mt-8'>
                                মেয়ে প্রতিনিধিদের তালিকা পাবলিকলি প্রকাশ করা হয় না। তুমি যদি মেয়ে হয়ে থাকো, তোমার এলাকায় মেয়ে প্রতিনিধি আছে কিনা, জানতে আমাদের <a className='underline' href='https://www.facebook.com/sholo.official'>ফেসবুক পেইজে</a> মেসেজ দাও।
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <div className="grid grid-cols-2 gap-2 md:gap-6 my-4 md:my-8 max-w-5xl mx-auto">
                        {products.map((product) => (
                            <div
                                key={product.title}
                                className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-start p-2 md:p-4 hover:border-primary hover:shadow-lg cursor-pointer transition-all duration-200 ease-in-out"

                                onClick={() => {
                                    setProduct(product)
                                    setProductImageModalOpen(true)
                                }
                                }
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-20 h-30 object-cover rounded-md"
                                />
                                <div className='flex flex-col items-start py-6 px-2'>
                                    <div className="font-display font-semibold md:text-lg">{product.title}</div>
                                    <div className="text-base font-medium text-primary">{enToBnNumber(product.price)} টাকা</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold mb-4">লাইব্রেরি</h2>
                তোমার এলাকার লাইব্রেরিতে ষোলো পাওয়া যাচ্ছে কিনা দেখতে <a href='https://docs.google.com/document/d/1PLl-w7VTg-CeGYuSJyVWRwLmUJ3uNsCI968BdeS9qQY/edit?tab=t.0' className='underline' >এখানে ক্লিক করো। </a>
            </div>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold mb-4">অনলাইনে অর্ডার।</h2>
                <ul className="space-y-4 flex flex-col sm:flex-row sm:space-x-16 sm:space-y-0">
                    <li className="flex items-center space-x-4">
                        <a
                            href="https://www.rokomari.com/book/author/125835/sholo-team?utm_source=sholo.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            <img
                                src="/rokomari_logo.webp"
                                alt="Rokomari Logo"
                                className="w-24 h-16 object-contain rounded"
                            />
                        </a>
                    </li>
                    <li className="flex items-center space-x-4">
                        <a
                            href="https://www.wafilife.com/cat/books/author/sholo-team?utm_source=sholo.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            <img
                                src="/wafilife.png"
                                alt="Wafilife Logo"
                                className="w-24 h-16 object-contain rounded"
                            />
                        </a>
                    </li>
                </ul>
            </div>

            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold mb-4">ফ্রি পিডিএফ</h2>
                <a href='/pdf' className='underline' >আগের সংখ্যাগুলো এখানে পাবে</a>
            </div>


        </div>
    )
}


export async function getStaticProps() {
    const sheetId = process.env.GOOGLE_SHEETS_ID
    const credentialsJson = process.env.GOOGLE_SHEETS_CREDENTIALS_JSON

    if (!sheetId) {
        throw new Error("GOOGLE_SHEETS_ID env variable not set")
    }
    if (!credentialsJson) {
        throw new Error("GOOGLE_SHEETS_CREDENTIALS_JSON env variable not set")
    }

    // Parse credentials from env variable
    const credentials = JSON.parse(credentialsJson)

    // Authenticate
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })
    const sheets = google.sheets({ version: "v4", auth })

    // Read data
    const range = "Sheet1!A2:F"
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range,
    })

    // Map rows to your type
    const rows = response.data.values || []
    const representitives = rows.map((row, idx) => ({
        id: row[0],
        name: row[1] || "",
        phone: Number(row[2]) || 0,
        location: row[3] || "",
        district: row[4] || "",
        division: row[5] || "",
    }))

    return {
        props: {
            representitives,
        },
        revalidate: 3600,
    }
}