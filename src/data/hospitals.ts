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

export type HospitalCategory = 'Eyes' | 'Pediatrician' | 'General';

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
    isBranded: boolean;
    category: HospitalCategory;
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
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400",
        isBranded: false,
        category: 'Eyes'
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
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400",
        isBranded: true,
        category: 'Eyes'
    },
    {
        id: 3,
        name: "SMS Hospital (Vepery area)",
        address: "21, Clemens Road, Vepery, Chennai",
        pinCode: "600007",
        rating: 4.8,
        distance: "1.2 km",
        availableToday: true,
        timings: "24 Hours Open",
        contact: "+91 44 2532 1122",
        doctors: [
            { id: 301, name: "Dr. Sathish Kumar", specialty: "Ophthalmologist", timings: "10:00 AM - 05:00 PM" },
            { id: 302, name: "Dr. Meera", specialty: "Pediatric Eye Specialist", timings: "09:00 AM - 01:00 PM" }
        ],
        services: [
            { name: "Pediatric Ophthalmology", description: "Children's eye care" },
            { name: "General Eye Checkup", description: "Routine exams" }
        ],
        image: "/images/hospitals/sms-vepery.png",
        isBranded: false,
        category: 'Pediatrician'
    },
    {
        id: 4,
        name: "SMS Hospital (Royapuram)",
        address: "Royapuram (North Chennai)",
        pinCode: "600013",
        rating: 4.6,
        distance: "5.4 km",
        availableToday: true,
        timings: "09:00 AM - 08:30 PM",
        contact: "+91 44 4343 0000",
        doctors: [
            { id: 401, name: "Dr. Murali Mohan", specialty: "Senior Ophthalmologist", timings: "09:00 AM - 01:00 PM" }
        ],
        services: [
            { name: "Emergency Care", description: "24/7 emergency services" },
            { name: "Digital Vision Test", description: "Computerized eye testing" }
        ],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400",
        isBranded: false,
        category: 'Eyes'
    },
    {
        id: 5,
        name: "S.M.S Hospital",
        address: "21, Clemens Road, Vepery, Chennai",
        pinCode: "600007",
        rating: 4.7,
        distance: "1.5 km",
        availableToday: true,
        timings: "09:00 AM - 07:00 PM",
        contact: "+91 44 2822 0101",
        doctors: [
            { id: 501, name: "Dr. Venkatesh", specialty: "Pediatrician", timings: "02:00 PM - 06:00 PM" }
        ],
        services: [
            { name: "Child Vaccination", description: "Immunization for children" },
            { name: "Newborn Care", description: "Specialized care for infants" }
        ],
        image: "/images/hospitals/sms-vepery.png",
        isBranded: false,
        category: 'Pediatrician'
    },
    {
        id: 6,
        name: "Vasan Eye Care",
        address: "Nelson Manickam Rd, Aminjikarai, Chennai",
        pinCode: "600029",
        rating: 4.3,
        distance: "2.8 km",
        availableToday: true,
        timings: "08:30 AM - 08:30 PM",
        contact: "+91 44 4343 4343",
        doctors: [
            { id: 601, name: "Dr. Murali", specialty: "Refractive Surgeon", timings: "09:00 AM - 01:00 PM" }
        ],
        services: [
            { name: "Pediatric Eye Care", description: "Specialized care for children" },
            { name: "Optical Shop", description: "Wide range of eyewear" }
        ],
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400",
        isBranded: true,
        category: 'Eyes'
    }
];
