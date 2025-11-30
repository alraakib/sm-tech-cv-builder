"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RootState } from "@/utils/store";
import { updatePersonalInfo } from "@/utils/store/reducers/personal-info";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    countryRegion,
    address,
    city,
    state,
    zipCode,
  } = useSelector((state: RootState) => state.personalInfo);

  const { control, watch } = useForm({
    defaultValues: {
      firstName,
      lastName,
      phoneNumber,
      emailAddress,
      countryRegion,
      address,
      city,
      state,
      zipCode,
    },
  });

  var countryList: string[] = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  useEffect(() => {
    const subscription = watch((data) => {
      dispatch(updatePersonalInfo(data));
    });
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  return (
    <motion.div
      initial={{ x: "50vw", opacity: 0.5 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5"
    >
      <h2 className="text-4xl font-semibold">Tell Us About Yourself</h2>
      <p className="text-muted-foreground">
        Fill in your personal details so we can tailor your resume perfectly to
        your career goals.
      </p>
      <div className="grid grid-cols-12 gap-5">
        {/* First Name */}
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input {...field} size="lg" placeholder="First Name" />
            </div>
          )}
        />

        {/* Last Name */}
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input {...field} size="lg" placeholder="Last Name" />
            </div>
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input {...field} size="lg" placeholder="Phone Number" />
            </div>
          )}
        />

        {/* Email Address */}
        <Controller
          name="emailAddress"
          control={control}
          render={({ field }) => (
            <div className="col-span-6 flex flex-col gap-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input {...field} size="lg" placeholder="Email Address" />
            </div>
          )}
        />

        {/* Country/Region */}
        <Controller
          name="countryRegion"
          control={control}
          render={({ field }) => (
            <div className="col-span-4 flex flex-col gap-2">
              <Label htmlFor="countryRegion">Country/Region</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full" size="lg">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countryList.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        {/* Address */}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <div className="col-span-8 flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <Input {...field} size="lg" placeholder="Address" />
            </div>
          )}
        />

        {/* City */}
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <div className="col-span-4 flex flex-col gap-2">
              <Label htmlFor="city">City</Label>
              <Input {...field} size="lg" placeholder="City" />
            </div>
          )}
        />

        {/* State */}
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <div className="col-span-4 flex flex-col gap-2">
              <Label htmlFor="state">State</Label>
              <Input {...field} size="lg" placeholder="State" />
            </div>
          )}
        />

        {/* Zip Code */}
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <div className="col-span-4 flex flex-col gap-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input {...field} size="lg" placeholder="Zip Code" />
            </div>
          )}
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;
