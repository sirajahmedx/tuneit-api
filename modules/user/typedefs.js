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
        phone: String
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

    type Response {
        message: String
        success: Boolean
    }

    input CreateCustomerInput {
        first_name: String!
        last_name: String
        email: String!
        age: Int
        role: String
        gender: String!
        cnic: String
        avatar: String
        cnic_back: String
        cnic_front: String
        phone: String
        address: [AddressInput]
        password: String!
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

    input UpdateCustomerInput {
        _id: ID!
        first_name: String
        last_name: String
        email: String
        age: Int
        gender: String
        cnic: String
        avatar: String
        cnic_back: String
        cnic_front: String
        phone: String
        address: [AddressInput]
        experience: String
    }


`;

module.exports.typedefs = typedefs;
