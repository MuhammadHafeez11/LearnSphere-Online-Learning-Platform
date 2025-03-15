const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // Name of the organization (e.g., University XYZ)
  description: { type: String },  // Brief description of the organization
  logo: { type: String },  // URL of the organization's logo
  websiteUrl: { type: String },  // Website URL of the organization
  contactEmail: { type: String, required: true, unique: true },  // Contact email for the organization
  contactPhone: { type: String },  // Contact phone number for the organization
  orgId: { type: String },
  address: {
    street: { type: String },  // Street address of the organization
    city: { type: String },  // City of the organization
    state: { type: String },  // State or region
    postalCode: { type: String },  // Postal or ZIP code
    country: { type: String },  // Country
  },
  registrationDate: { type: Date, default: Date.now },  // Date when the organization was registered
  isActive: { type: Boolean, default: true },  // Status to indicate if the organization is active
  plan: { 
    type: String, 
    enum: ['Free', 'Basic', 'Pro', 'Enterprise'],  // Type of subscription or plan the organization is on
    default: 'Free'
  },
  socialMediaLinks: {
    facebook: { type: String },  // Facebook page URL
    twitter: { type: String },  // Twitter handle URL
    linkedin: { type: String },  // LinkedIn profile URL
    instagram: { type: String },  // Instagram profile URL
    youtube: { type: String }  // YouTube channel URL
  },
  complianceInfo: {
    taxId: { type: String },  // Tax identification number
    registrationNumber: { type: String },  // Business registration number
    legalName: { type: String },  // Legal name of the organization (if different from the displayed name)
    legalAddress: {
      street: { type: String },  // Legal street address
      city: { type: String },  // Legal city
      state: { type: String },  // Legal state
      postalCode: { type: String },  // Legal postal or ZIP code
      country: { type: String },  // Legal country
    }
  },
  contactPerson: {
    name: { type: String },  // Name of the primary contact person
    position: { type: String },  // Position of the contact person in the organization
    email: { type: String },  // Email of the contact person
    phone: { type: String }  // Phone number of the contact person
  },
  branding: {
    primaryColor: { type: String },  // Primary color used in branding
    secondaryColor: { type: String },  // Secondary color used in branding
    tagline: { type: String }  // Tagline or slogan of the organization
  },

  additionalInfo: {
    operatingHours: {
      monday: { type: String },  // Operating hours for Monday
      tuesday: { type: String },  // Operating hours for Tuesday
      wednesday: { type: String },  // Operating hours for Wednesday
      thursday: { type: String },  // Operating hours for Thursday
      friday: { type: String },  // Operating hours for Friday
      saturday: { type: String },  // Operating hours for Saturday
      sunday: { type: String }  // Operating hours for Sunday
    },
    notes: { type: String }  // Any additional notes or comments about the organization
  },
}, { timestamps: true});


// Pre-save hook to generate student ID
organizationSchema.pre('save', async function (next) {
  if (!this.orgId) {
    // Generate a unique student ID (e.g., "STU" + random number)
    const randomID = 'ORG' + Math.floor(1000 + Math.random() * 9000);  // Generates STUxxxx
    const existingOrg = await this.constructor.findOne({ orgId: randomID });
    
    // Ensure ID is unique
    if (!existingOrg) {
      this.orgId = randomID;
    } else {
      next(new Error('Error generating unique Organization Id, please try again.'));
    }
  }
  next();
});

module.exports = mongoose.model('Organization', organizationSchema);
