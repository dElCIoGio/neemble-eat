
import {useState, useEffect, JSX} from "react"
import {
    ChevronRight,
    HelpCircle,
    Info,
    Settings,
    ShoppingBag,
    User,
    CreditCard,
    LayoutGrid,
    CheckCircle2,
    AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {Link} from "react-router-dom";


function FeatureCard({ icon, title, description }: { icon: JSX.Element, title: string, description: string}) {
    return (
        <div className="p-4 rounded-md shadow-sm border">
            <div className="mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0)
    const totalSteps = 6 // Increased by 1 for the personal info step

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const steps = [
        {
            title: "Your Information",
            description: "Tell us about yourself and your role.",
            icon: <User className="h-5 w-5" />,
            content: <PersonalInfoStep onNext={nextStep} />,
        },
        {
            title: "Set Up Your Restaurant Profile",
            description: "Let's start with the basics about your restaurant.",
            icon: <User className="h-5 w-5" />,
            content: <RestaurantProfileStep onNext={nextStep} onPrev={prevStep} />,
        },
        {
            title: "Add Menu Items",
            description: "Upload your menu with dish details and images.",
            icon: <ShoppingBag className="h-5 w-5" />,
            content: <MenuItemsStep onNext={nextStep} onPrev={prevStep} />,
        },
        {
            title: "Configure Payment Methods",
            description: "Set up how you'll receive payments from customers.",
            icon: <CreditCard className="h-5 w-5" />,
            content: <PaymentMethodsStep onNext={nextStep} onPrev={prevStep} />,
        },
        {
            title: "Set Up Order Management",
            description: "Configure how you'll handle incoming orders.",
            icon: <LayoutGrid className="h-5 w-5" />,
            content: <OrderManagementStep onNext={nextStep} onPrev={prevStep} />,
        },
        {
            title: "Customize Settings",
            description: "Adjust notifications and branding options.",
            icon: <Settings className="h-5 w-5" />,
            content: <CustomizeSettingsStep onNext={nextStep} onPrev={prevStep} />,
        },
        {
            title: "You're All Set!",
            description: "Welcome to Neemble Eat.",
            icon: <CheckCircle2 className="h-5 w-5" />,
            content: <CompletionStep />,
        },
    ]

    // If we're on the intro screen (before step 0)
    if (currentStep === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center max-w-3xl">
                    <h1 className="text-4xl font-bold text-indigo-800 mb-6">Welcome to Neemble Eat! Let's Get You Started.</h1>
                    <p className="text-xl text-gray-600 mb-12">
                        Neemble Eat is your all-in-one restaurant management solution that streamlines orders, improves customer
                        service, and boosts efficiency.
                    </p>

                    <div className="w-full max-w-md">
                        <Button onClick={() => setCurrentStep(1)} className="w-full py-6 text-lg bg-indigo-600 hover:bg-indigo-700">
                            Start Onboarding
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8 w-full">
                        <FeatureCard
                            icon={<ShoppingBag className="h-8 w-8 text-indigo-600" />}
                            title="Streamlined Orders"
                            description="Manage all your orders in one place with our intuitive interface."
                        />
                        <FeatureCard
                            icon={<CreditCard className="h-8 w-8 text-indigo-600" />}
                            title="Easy Payments"
                            description="Accept payments through multiple gateways with minimal setup."
                        />
                        <FeatureCard
                            icon={<LayoutGrid className="h-8 w-8 text-indigo-600" />}
                            title="Team Management"
                            description="Manage your restaurant staff and assign roles efficiently."
                        />
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Progress indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {steps.slice(0, totalSteps).map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                            index < currentStep
                                                ? "bg-indigo-600 text-white"
                                                : index === currentStep
                                                    ? "bg-indigo-100 border-2 border-indigo-600 text-indigo-600"
                                                    : "bg-gray-100 text-gray-400"
                                        }`}
                                    >
                                        {index < currentStep ? <CheckCircle2 className="h-5 w-5" /> : step.icon}
                                    </div>
                                    <span
                                        className={`text-xs hidden md:block ${index === currentStep ? "text-indigo-600 font-medium" : "text-gray-500"}`}
                                    >
                    {step.title}
                  </span>
                                </div>
                            ))}
                        </div>
                        <div className="relative mt-2">
                            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
                            <div
                                className="absolute top-0 left-0 h-1 bg-indigo-600 rounded transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Step content */}
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{steps[currentStep - 1].title}</h2>
                        <p className="text-gray-600 mb-6">{steps[currentStep - 1].description}</p>
                        {steps[currentStep - 1].content}
                    </div>
                </div>
            </main>
        </div>
    )
}

// Add a new component for the personal information step
function PersonalInfoStep({ onNext }: {onNext: () => void}) {
    const [formData, setFormData] = useState<{
        fullName: string,
        position: string,
        email: string,
        phone: string,
    }>({
        fullName: "",
        position: "",
        email: "",
        phone: "",
    })

    const [errors, setErrors] = useState<{
        fullName?: string,
        position?: string,
        email?: string,
        phone?: string,
    }>({})
    const [formValid, setFormValid] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const validateForm = () => {
        const newErrors: {
            fullName?: string,
            position?: string,
            email?: string,
            phone?: string,
        } = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.position.trim()) {
            newErrors.position = "Position is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    useEffect(() => {
        const isValid = validateForm()
        setFormValid(isValid)
    }, [formData])

    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Alert className="bg-indigo-50 border-indigo-200 text-indigo-800">
                <Info className="h-4 w-4" />
                <AlertDescription>Please provide your personal information to help us set up your account.</AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleChange(e)}
                        placeholder="John Smith"
                        className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                    <Label htmlFor="position">
                        Position at Restaurant <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, position: value })}>
                        <SelectTrigger id="position" className={`mt-1 ${errors.position ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Select your position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="chef">Chef</SelectItem>
                            <SelectItem value="waiter">Waiter/Waitress</SelectItem>
                            <SelectItem value="host">Host/Hostess</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@restaurant.com"
                        className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button
                    type="submit"
                    disabled={!formValid}
                    className={`${formValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"}`}
                >
                    Continue
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    )
}

// Update the RestaurantProfileStep to include validation and back button
function RestaurantProfileStep({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
    const [formData, setFormData] = useState<{
        restaurantName: string,
        cuisineType: string,
        address: string,
        email: string,
        phone: string,
        logo: File|null,
    }>({
        restaurantName: "",
        cuisineType: "",
        address: "",
        email: "",
        phone: "",
        logo: null,
    })

    const [errors, setErrors] = useState<{
        restaurantName?: string,
        cuisineType?: string,
        address?: string,
        email?: string,
        phone?: string,
        logo?: string,
    }>({})
    const [formValid, setFormValid] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const handleSelectChange = (id: string, value: string) => {
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const validateForm = () => {
        const newErrors:{
            restaurantName?: string,
            cuisineType?: string,
            address?: string,
            email?: string,
            phone?: string,
            logo?: string,
        } = {}

        if (!formData.restaurantName.trim()) {
            newErrors.restaurantName = "Restaurant name is required"
        }

        if (!formData.cuisineType) {
            newErrors.cuisineType = "Cuisine type is required"
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    useEffect(() => {
        const isValid = validateForm()
        setFormValid(isValid)
    }, [formData])

    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="restaurantName">
                        Restaurant Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        placeholder="e.g., Delicious Bites"
                        className={`mt-1 ${errors.restaurantName ? "border-red-500" : ""}`}
                    />
                    {errors.restaurantName && <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>}
                </div>
                <div>
                    <Label htmlFor="cuisineType">
                        Cuisine Type <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("cuisineType", value)}>
                        <SelectTrigger id="cuisineType" className={`mt-1 ${errors.cuisineType ? "border-red-500" : ""}`}>
                            <SelectValue placeholder="Select cuisine type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="italian">Italian</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                            <SelectItem value="mexican">Mexican</SelectItem>
                            <SelectItem value="indian">Indian</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.cuisineType && <p className="text-red-500 text-sm mt-1">{errors.cuisineType}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                </Label>
                <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange(e)}
                    placeholder="Full restaurant address"
                    className={`mt-1 ${errors.address ? "border-red-500" : ""}`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="email">
                        Contact Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="restaurant@example.com"
                        className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <Label htmlFor="phone">
                        Contact Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="logo-upload">Restaurant Logo</Label>
                <div className="mt-1 flex items-center">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                        <Button variant="ghost" className="h-full w-full flex flex-col items-center justify-center text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="text-xs mt-1">Upload</span>
                        </Button>
                    </div>
                    <div className="ml-4 text-sm text-gray-500">
                        <p>PNG, JPG or SVG (max. 2MB)</p>
                        <p>Recommended size: 512x512px</p>
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-between">
                <Button type="button" variant="outline" onClick={onPrev}>
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={!formValid}
                    className={`${formValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"}`}
                >
                    Save & Continue
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    )
}

// Update the MenuItemsStep to include validation
function MenuItemsStep({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
    const [activeTab, setActiveTab] = useState("add-item")
    const [formData, setFormData] = useState<{
        itemName: string,
        itemDescription: string,
        itemPrice: string,
        itemCategory: string,
        itemImage: File | null,
    }>({
        itemName: "",
        itemDescription: "",
        itemPrice: "",
        itemCategory: "",
        itemImage: null,
    })

    const [errors, setErrors] = useState<{
        itemName?: string,
        itemDescription?: string,
        itemPrice?: string,
        itemCategory?: string,
        itemImage?: string,
    }>({})
    const [formValid, setFormValid] = useState(false)
    const [fileUploaded, setFileUploaded] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const handleSelectChange = (id: string, value: string) => {
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const validateForm = () => {
        // Only validate if we're on the add-item tab
        if (activeTab === "bulk-upload") {
            return fileUploaded
        }

        const newErrors:{
            itemName?: string,
            itemDescription?: string,
            itemPrice?: string,
            itemCategory?: string,
            itemImage?: string,
        } = {}

        if (!formData.itemName.trim()) {
            newErrors.itemName = "Item name is required"
        }

        if (!formData.itemDescription.trim()) {
            newErrors.itemDescription = "Description is required"
        }

        if (!formData.itemPrice.trim()) {
            newErrors.itemPrice = "Price is required"
        }

        if (!formData.itemCategory) {
            newErrors.itemCategory = "Category is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    useEffect(() => {
        const isValid = validateForm()
        setFormValid(isValid)
    }, [formData, activeTab, fileUploaded])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validateForm()

        if (isValid) {
            onNext()
        }
    }

    const handleFileUpload = () => {
        setFileUploaded(true)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="add-item" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="add-item">Add Menu Item</TabsTrigger>
                    <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="add-item" className="pt-4">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="itemName">
                                Item Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="itemName"
                                value={formData.itemName}
                                onChange={handleChange}
                                placeholder="e.g., Margherita Pizza"
                                className={`mt-1 ${errors.itemName ? "border-red-500" : ""}`}
                            />
                            {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>}
                        </div>

                        <div>
                            <Label htmlFor="itemDescription">
                                Description <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="itemDescription"
                                value={formData.itemDescription}
                                onChange={handleChange}
                                placeholder="Describe your dish..."
                                className={`mt-1 ${errors.itemDescription ? "border-red-500" : ""}`}
                            />
                            {errors.itemDescription && <p className="text-red-500 text-sm mt-1">{errors.itemDescription}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="itemPrice">
                                    Price <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="itemPrice"
                                    value={formData.itemPrice}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className={`mt-1 ${errors.itemPrice ? "border-red-500" : ""}`}
                                />
                                {errors.itemPrice && <p className="text-red-500 text-sm mt-1">{errors.itemPrice}</p>}
                            </div>
                            <div>
                                <Label htmlFor="itemCategory">
                                    Category <span className="text-red-500">*</span>
                                </Label>
                                <Select onValueChange={(value) => handleSelectChange("itemCategory", value)}>
                                    <SelectTrigger id="itemCategory" className={`mt-1 ${errors.itemCategory ? "border-red-500" : ""}`}>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="appetizers">Appetizers</SelectItem>
                                        <SelectItem value="main-courses">Main Courses</SelectItem>
                                        <SelectItem value="desserts">Desserts</SelectItem>
                                        <SelectItem value="beverages">Beverages</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.itemCategory && <p className="text-red-500 text-sm mt-1">{errors.itemCategory}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="item-image">Item Image</Label>
                            <div className="mt-1 flex items-center">
                                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                                    <Button
                                        variant="ghost"
                                        className="h-full w-full flex flex-col items-center justify-center text-gray-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <span className="text-xs mt-1">Upload</span>
                                    </Button>
                                </div>
                                <div className="ml-4 text-sm text-gray-500">
                                    <p>PNG or JPG (max. 5MB)</p>
                                    <p>Recommended size: 1200x800px</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button type="button" className="w-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                                Add Another Item
                            </Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="bulk-upload" className="pt-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        <div className="mx-auto flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="mt-4 text-sm text-gray-600">Drag and drop your menu file here, or click to browse</p>
                            <p className="mt-2 text-xs text-gray-500">Supported formats: CSV, Excel</p>
                            <Button className="mt-4" variant="outline" onClick={handleFileUpload}>
                                Browse Files
                            </Button>
                            <Link to="#" className="mt-4 text-xs text-indigo-600 hover:underline">
                                Download template file
                            </Link>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={onPrev}>
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={!formValid}
                    className={`${formValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"}`}
                >
                    Add Menu & Continue
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    )
}

// Update the PaymentMethodsStep to include validation
function PaymentMethodsStep({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
    const [connectedPayments, setConnectedPayments] = useState<{
        creditCard: boolean,
        mobilePayment: boolean,
        bankTransfer: boolean,
    }>({
        creditCard: false,
        mobilePayment: false,
        bankTransfer: false,
    })

    const [formValid, setFormValid] = useState(false)

    const togglePaymentConnection = (paymentType: "creditCard" | "mobilePayment" | "bankTransfer") => {
        setConnectedPayments({
            ...connectedPayments,
            [paymentType]: !connectedPayments[paymentType],
        })
    }

    useEffect(() => {
        // At least one payment method must be connected
        const isValid = Object.values(connectedPayments).some((value) => value === true)
        setFormValid(isValid)
    }, [connectedPayments])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formValid) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4">
                <div className="flex items-start">
                    <Info className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-indigo-700">
                        Connect your payment gateways to start accepting payments. You must connect at least one payment method to
                        continue.
                    </p>
                </div>
            </div>

            {!formValid && (
                <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Please connect at least one payment method to continue.</AlertDescription>
                </Alert>
            )}

            <div className="space-y-4">
                <PaymentMethodCard
                    name="Credit Card Processor"
                    description="Accept Visa, Mastercard, Amex and more"
                    logo="/placeholder.svg?height=40&width=120"
                    connected={connectedPayments.creditCard}
                    onToggle={() => togglePaymentConnection("creditCard")}
                />

                <PaymentMethodCard
                    name="Mobile Payment"
                    description="Accept payments via mobile wallets"
                    logo="/placeholder.svg?height=40&width=120"
                    connected={connectedPayments.mobilePayment}
                    onToggle={() => togglePaymentConnection("mobilePayment")}
                />

                <PaymentMethodCard
                    name="Bank Transfer"
                    description="Accept direct bank transfers"
                    logo="/placeholder.svg?height=40&width=120"
                    connected={connectedPayments.bankTransfer}
                    onToggle={() => togglePaymentConnection("bankTransfer")}
                />
            </div>

            <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={onPrev}>
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={!formValid}
                    className={`${formValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"}`}
                >
                    Set Up Payments & Continue
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    )
}

function PaymentMethodCard({ name, description, logo, connected, onToggle }: { name: string, description: string, logo: string, connected: boolean, onToggle: () => void }) {
    return (
        <div className="border rounded-md p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo || "/placeholder.svg"} alt={name} width={120} height={40} className="mr-4" />
                    <div>
                        <h3 className="font-medium text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                </div>
                <Button
                    type="button"
                    variant={connected ? "outline" : "default"}
                    className={connected ? "text-green-600 border-green-600" : "bg-indigo-600 hover:bg-indigo-700"}
                    onClick={onToggle}
                >
                    {connected ? "Connected" : "Connect"}
                </Button>
            </div>
        </div>
    )
}

// Update the OrderManagementStep to include validation
function OrderManagementStep({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
    const [formData, setFormData] = useState({
        qrCodeEnabled: false,
        posEnabled: false,
        receiptPrinterEnabled: false,
        kitchenDisplayEnabled: false,
        takeoutEnabled: false,
        advanceOrderingEnabled: false,
        deliveryEnabled: false,
        thirdPartyDeliveryEnabled: false,
    })

    const [formValid, setFormValid] = useState(false)

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target
        setFormData({
            ...formData,
            [id]: checked,
        })
    }

    useEffect(() => {
        // At least one ordering method must be enabled
        const isValid = formData.qrCodeEnabled || formData.posEnabled || formData.takeoutEnabled || formData.deliveryEnabled
        setFormValid(isValid)
    }, [formData])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formValid) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {!formValid && (
                <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Please enable at least one ordering method (QR Code, POS, Take-Out, or Delivery) to continue.
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>QR Code Orders</CardTitle>
                        <CardDescription>Allow customers to scan QR codes to place orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center p-4">
                            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                                <span className="text-xs text-gray-500">QR Code Preview</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Customize</Button>
                        <Button
                            type="button"
                            className={
                                formData.qrCodeEnabled ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
                            }
                            onClick={() => setFormData({ ...formData, qrCodeEnabled: !formData.qrCodeEnabled })}
                        >
                            {formData.qrCodeEnabled ? "Enabled" : "Enable"}
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Countertop Orders</CardTitle>
                        <CardDescription>Process orders directly at your counter</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="posEnabled"
                                    checked={formData.posEnabled}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <Label htmlFor="posEnabled">Enable POS System</Label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="receiptPrinterEnabled"
                                    checked={formData.receiptPrinterEnabled}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <Label htmlFor="receiptPrinterEnabled">Connect Receipt Printer</Label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="kitchenDisplayEnabled"
                                    checked={formData.kitchenDisplayEnabled}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <Label htmlFor="kitchenDisplayEnabled">Enable Kitchen Display</Label>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="button"
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => setFormData({ ...formData, posEnabled: true })}
                        >
                            Configure POS
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Take-Out & Delivery</CardTitle>
                    <CardDescription>Configure options for take-out and delivery orders</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium mb-2">Take-Out Options</h4>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="takeoutEnabled"
                                        checked={formData.takeoutEnabled}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="takeoutEnabled">Enable Take-Out</Label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="advanceOrderingEnabled"
                                        checked={formData.advanceOrderingEnabled}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="advanceOrderingEnabled">Allow Advance Ordering</Label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Delivery Options</h4>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="deliveryEnabled"
                                        checked={formData.deliveryEnabled}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="deliveryEnabled">Enable Delivery</Label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="thirdPartyDeliveryEnabled"
                                        checked={formData.thirdPartyDeliveryEnabled}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <Label htmlFor="thirdPartyDeliveryEnabled">Use Third-Party Delivery</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={onPrev}>
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={!formValid}
                    className={`${formValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-300 cursor-not-allowed"}`}
                >
                    Configure & Continue
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    )
}

// Update the CustomizeSettingsStep to include validation
function CustomizeSettingsStep({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
    // const [formData, setFormData] = useState({
    //     primaryColor: "#4F46E5",
    //     secondaryColor: "#1F2937",
    //     fontFamily: "inter",
    //     language: "en",
    //     timezone: "utc",
    //     currency: "usd",
    //     dateFormat: "mdy",
    // })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onNext()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Tabs defaultValue="notifications" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="notifications" className="pt-4 space-y-4">
                    <div className="space-y-2">
                        <h3 className="font-medium">Order Notifications</h3>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="new-order">New Order Alerts</Label>
                            <input type="checkbox" id="new-order" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="order-status">Order Status Updates</Label>
                            <input type="checkbox" id="order-status" className="toggle" defaultChecked />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium">Customer Notifications</h3>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="order-confirmation">Order Confirmation</Label>
                            <input type="checkbox" id="order-confirmation" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="order-ready">Order Ready Notification</Label>
                            <input type="checkbox" id="order-ready" className="toggle" defaultChecked />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-medium">Notification Methods</h3>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <input type="checkbox" id="email-notifications" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                            <input type="checkbox" id="sms-notifications" className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <input type="checkbox" id="push-notifications" className="toggle" />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="branding" className="pt-4 space-y-4">
                    <div>
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex items-center mt-1">
                            <div className="w-10 h-10 rounded-md bg-indigo-600 mr-4"></div>
                            <Input id="primary-color" defaultValue="#4F46E5" className="w-32" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="secondary-color">Secondary Color</Label>
                        <div className="flex items-center mt-1">
                            <div className="w-10 h-10 rounded-md bg-gray-800 mr-4"></div>
                            <Input id="secondary-color" defaultValue="#1F2937" className="w-32" />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="font-family">Font Family</Label>
                        <Select defaultValue="inter">
                            <SelectTrigger id="font-family" className="mt-1">
                                <SelectValue placeholder="Select font family" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="inter">Inter</SelectItem>
                                <SelectItem value="roboto">Roboto</SelectItem>
                                <SelectItem value="open-sans">Open Sans</SelectItem>
                                <SelectItem value="montserrat">Montserrat</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="receipt-logo">Receipt Logo</Label>
                        <div className="mt-1 flex items-center">
                            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                                <Button
                                    variant="ghost"
                                    className="h-full w-full flex flex-col items-center justify-center text-gray-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="text-xs mt-1">Upload</span>
                                </Button>
                            </div>
                            <div className="ml-4 text-sm text-gray-500">
                                <p>PNG or JPG (max. 1MB)</p>
                                <p>Recommended size: 200x100px</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="preferences" className="pt-4 space-y-4">
                    <div>
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                            <SelectTrigger id="language" className="mt-1">
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                                <SelectItem value="pt">Portuguese</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="utc">
                            <SelectTrigger id="timezone" className="mt-1">
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="utc">UTC</SelectItem>
                                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                                <SelectItem value="cst">Central Time (CST)</SelectItem>
                                <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue="usd">
                            <SelectTrigger id="currency" className="mt-1">
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usd">USD ($)</SelectItem>
                                <SelectItem value="eur">EUR (€)</SelectItem>
                                <SelectItem value="gbp">GBP (£)</SelectItem>
                                <SelectItem value="jpy">JPY (¥)</SelectItem>
                                <SelectItem value="cad">CAD ($)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue="mdy">
                            <SelectTrigger id="date-format" className="mt-1">
                                <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={onPrev}>
                    Back
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                    Finish Setup
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </form>
    )
}

function CompletionStep() {
    return (
        <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">You're All Set! Welcome to Neemble Eat.</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Your restaurant is now configured and ready to go. You can start managing orders, updating your menu, and
                growing your business with Neemble Eat.
            </p>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <Card className="text-left">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Tips for Success</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                    <span>Update your menu regularly</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                    <span>Add high-quality food photos</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                    <span>Train your staff on the system</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="text-left">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                                    <Link to="#" className="text-indigo-600 hover:underline">
                                        Knowledge Base
                                    </Link>
                                </li>
                                <li className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                                    <Link to="#" className="text-indigo-600 hover:underline">
                                        Contact Support
                                    </Link>
                                </li>
                                <li className="flex items-start">
                                    <HelpCircle className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                                    <Link to="#" className="text-indigo-600 hover:underline">
                                        Video Tutorials
                                    </Link>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="text-left">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="text-sm space-y-2 text-gray-600">
                                <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                                    <span>Invite your team members</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                                    <span>Set up your first promotion</span>
                                </li>
                                <li className="flex items-start">
                                    <ChevronRight className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" />
                                    <span>Connect social media accounts</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="pt-6">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-6 text-lg">Go to Dashboard</Button>
                </div>

                <div className="pt-4 text-sm text-gray-500">
                    <p>
                        Want a guided tour?{" "}
                        <Link to="#" className="text-indigo-600 hover:underline">
                            Take the feature tour
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

