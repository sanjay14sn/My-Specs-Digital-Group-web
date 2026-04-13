export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    timings: string;
    image?: string;
}

export interface Service {
    name: string;
    description: string;
}

export interface Hospital {
    id: number;
    name: string;
    address: string;
    pinCode: string;
    rating: number;
    distance?: string;
    availableToday: boolean;
    timings: string;
    contact: string;
    doctors: Doctor[];
    services: Service[];
    image?: string;
}

export const HOSPITALS: Hospital[] = [
    {
        id: 1,
        name: "Sankara Nethralaya",
        address: "18, College Rd, Thousand Lights, Chennai",
        pinCode: "600006",
        rating: 4.9,
        distance: "3.2 km",
        availableToday: true,
        timings: "08:00 AM - 08:00 PM",
        contact: "+91 44 2827 1616",
        doctors: [
            { id: 101, name: "Dr. Badrinath", specialty: "Vitreoretinal Surgeon", timings: "10:00 AM - 02:00 PM" }
        ],
        services: [
            { name: "Retina Specialist", description: "Advanced retinal care" },
            { name: "Glaucoma Care", description: "Comprehensive glaucoma management" }
        ],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        name: "Agarwal's Eye Hospital",
        address: "Cathedral Rd, Gopalapuram, Chennai",
        pinCode: "600086",
        rating: 4.7,
        distance: "4.5 km",
        availableToday: true,
        timings: "09:00 AM - 09:00 PM",
        contact: "+91 44 2811 2811",
        doctors: [
            { id: 201, name: "Dr. Agarwal", specialty: "Cataract Specialist", timings: "11:00 AM - 04:00 PM" }
        ],
        services: [
            { name: "LASIK", description: "Laser vision correction" },
            { name: "Cataract Surgery", description: "Modern cataract removal" }
        ],
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        name: "Rajiv Gandhi Eye Hospital",
        address: "Anna Salai, Triplicane, Chennai",
        pinCode: "600002",
        rating: 4.4,
        distance: "6.1 km",
        availableToday: false,
        timings: "10:00 AM - 06:00 PM",
        contact: "+91 44 2533 3333",
        doctors: [
            { id: 301, name: "Dr. Sivakumar", specialty: "General Ophthalmologist", timings: "12:00 PM - 05:00 PM" }
        ],
        services: [
            { name: "General Checkup", description: "Routine eye examination" },
            { name: "Diabetic Retinopathy", description: "Diabetes-related eye care" }
        ],
        image: "https://images.unsplash.com/photo-1586773860418-d3b9a8ec817f?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 4,
        name: "Vasan Eye Care",
        address: "Nelson Manickam Rd, Aminjikarai, Chennai",
        pinCode: "600029",
        rating: 4.3,
        distance: "2.8 km",
        availableToday: true,
        timings: "08:30 AM - 08:30 PM",
        contact: "+91 44 4343 4343",
        doctors: [
            { id: 401, name: "Dr. Murali", specialty: "Refractive Surgeon", timings: "09:00 AM - 01:00 PM" }
        ],
        services: [
            { name: "Pediatric Eye Care", description: "Specialized care for children" },
            { name: "Optical Shop", description: "Wide range of eyewear" }
        ],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 5,
        name: "Med India Eye Hospital",
        address: "Nungambakkam High Rd, Chennai",
        pinCode: "600034",
        rating: 4.6,
        distance: "1.5 km",
        availableToday: true,
        timings: "09:00 AM - 07:00 PM",
        contact: "+91 44 2822 0101",
        doctors: [
            { id: 501, name: "Dr. Venkatesh", specialty: "Orbit & Oculoplasty", timings: "02:00 PM - 06:00 PM" }
        ],
        services: [
            { name: "Cosmetic Surgery", description: "Eye-related cosmetic procedures" },
            { name: "Dry Eye Clinic", description: "Treatment for dry eye syndrome" }
        ],
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 6,
        name: "Prabha Eye Clinic",
        address: "Jawaharlal Nehru Rd, Vadapalani, Chennai",
        pinCode: "600026",
        rating: 4.5,
        distance: "4.2 km",
        availableToday: true,
        timings: "10:00 AM - 08:00 PM",
        contact: "+91 44 2480 0000",
        doctors: [
            { id: 601, name: "Dr. Shanti", specialty: "Neuro-Ophthalmologist", timings: "10:00 AM - 01:00 PM" }
        ],
        services: [
            { name: "Low Vision Aids", description: "Help for low vision patients" },
            { name: "Eye Pharmacy", description: "Specialized ophthalmic pharmacy" }
        ],
        image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=400"
    }
];
