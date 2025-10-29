const typedefs = `
  type Service {
    _id: String
    name: String
    description: String
    price_type: String
    prices: [Price]
    banner: String
    images: [String]
    featured: Boolean
    discount: Float
    status: String
    service_count: Int
    keywords: [String]
    created_at: String
    updated_at: String
  }

  type Price {
    _id: String
    label: String
    price: Float
  }
  type GetAllServicesResponse {
    success: Boolean!
    message: String!
    data: [Service]
  }

  type ServiceResponse {
    success: Boolean!
    message: String!
    data: Service
  }
 

  type CreateServiceResponse {
    success: Boolean!
    message: String!
  }

  input PriceInput {
    _id: String
    label: String
    price: Float
  }
  input ServiceInput {
    name: String
    service_type: String
    category: String
    description: String
    sub_category: String 
    price_type: String
    prices: [PriceInput]
    visit_type: String
    banner: String
    images: [String]
    featured: Boolean
    duration: Float
    discount: Float
    status: String
    service_count: Int
    requires_advance_payment: Boolean
    advance_payment_percentage: Float
    keywords: [String]
  }
  
  input ServiceFilterInput {
    name: String
    service_type: String
    category: String
    sub_category: String
    keywords: String
    featured: Boolean
    search: String
    visit_type: String
  }
`;

module.exports.typedefs = typedefs;
