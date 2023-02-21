type customerStatus = 'active' | 'pending' | 'inactive'
export interface Customer {
    id: string,
    firstName: string,
    lastName: string,
    status: customerStatus,
    email: string,
    phone: string
}