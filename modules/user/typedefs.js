const typedefs = `
    type User {
        _id: ID!
        first_name: String!
        last_name: String
        email: String!
        age: Int
        role: String!
        gender: String
        cnic: String
        avatar: String
        cnic_back: String
        cnic_front: String
        # phone: String
        address: [Address]
        verified: [String]
        status: String
        account_status: String
        password: String!
        salt: String
        token: String
        otp: String
        otp_expiry: String
        job_counts: Int
        experience: String
        avg_rating: Float
        online: Boolean
        last_seen: String
        createdAt: String
        updatedAt: String
        google_id: String
        provider: String
        access_token: String
        id_token: String
    }

    type Address {
        _id: ID!
        city: String
        flat: String
        full_address: String
        is_default: Boolean
        location: Location
    }

    type Location {
        type: String
        coordinates: [Float]
    }

    type CreateCustomerResponse {
        success: Boolean
        message: String
    }

    type UpdateCustomerResponse {
        success: Boolean
        message: String
    }

    type CreateMechanicResponse {
        success: Boolean
        message: String
    }

    type UpdateMechanicResponse {
        success: Boolean
        message: String
    }

    type SignInResponse {
        success: Boolean
        message: String
        data: SignInData
    }

    type SignInData {
       verified: [String]
       token: String
    }

    type AuthResponse {
        success: Boolean!
        message: String!
        token: String
        user: User
    }
 


    input CreateCustomerInput {
        first_name: String!
        last_name: String
        email: String!
        role: String
        gender: String!
        password: String
        avatar: String
        address: [AddressInput]
    }

    input CreateMechanicInput {
        first_name: String!
        last_name: String
        email: String!
        cnic: String
        cnic_front: String
        cnic_back: String
        role: String
        gender: String
        password: String
        avatar: String
        address: [AddressInput]
        experience: String
    }

    input UpdateCustomerInput {
        _id: ID!
        first_name: String!
        last_name: String
        email: String!
        role: String
        gender: String!
        password: String
        avatar: String
        address: [AddressInput]
    }

    input UpdateMechanicInput {
        _id: ID!
        first_name: String!
        last_name: String
        email: String!
        role: String
        gender: String!
        cnic: String
        cnic_front: String
        cnic_back: String
        # phone: String
        avatar: String
        address: [AddressInput]
        experience: String
    }

        
    input AddressInput {
        city: String
        flat: String
        full_address: String
        is_default: Boolean
        location: LocationInput
    }

    input LocationInput {
        type: String
        coordinates: [Float]
    }

    input SignInInput {
        email: String
        # phone: String
        password: String!
    }

    input GoogleAuthInput {
        email: String!
        first_name: String!
        last_name: String
        provider: String!
        google_id: String!
        picture: String
        access_token: String!
        id_token: String!
    }


`;

module.exports.typedefs = typedefs;
