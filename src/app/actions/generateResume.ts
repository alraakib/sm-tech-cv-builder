"use server";

import type { CareerSummaryState } from "@/utils/store/reducers/career-summary";
import type { CertificateEntry } from "@/utils/store/reducers/certificate";
import type { ContactInfoState } from "@/utils/store/reducers/contact-information";
import type { EducationEntry } from "@/utils/store/reducers/education";
import type { ExperienceEntry } from "@/utils/store/reducers/experience-skill";
import type { PersonalInfoState } from "@/utils/store/reducers/personal-info";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "",
});

interface ResumeData {
  personalInfo: PersonalInfoState;
  careerSummary: CareerSummaryState;
  experience: { entries: ExperienceEntry[] };
  education: { entries: EducationEntry[] };
  contactInfo: ContactInfoState;
  certificate?: { entries: CertificateEntry[] };
}

export async function generateResume(data: ResumeData): Promise<string> {
  try {
    const {
      personalInfo,
      careerSummary,
      experience,
      education,
      contactInfo,
      certificate,
    } = data;

    const prompt = `You are a professional resume writer. Generate a complete, ATS-friendly resume strictly in HTML, following the structure and layout pattern provided in the reference.

RULES

Output ONLY pure HTML (no Markdown, no backticks, no explanation).
Do NOT include CSS files or links. Only inline HTML allowed, using hex colors where needed.
Follow the reference structure exactly (sections, hierarchy, layout).
Include ONLY sections that contain real data—omit any empty or undefined sections.
Ignore all null, undefined, or empty fields in the input data.
KEEP ALL INPUT DATA EXACTLY AS PROVIDED
Do not convert or reformat dates (e.g., keep cert.issueDate unchanged).
Do not modify duration fields, GPA, notes, URLs, or any raw text.
Use ATS-safe bullet points and professional language.
Replace variables with user-provided data exactly as written.
Do not include any shadow, gradient, or complex styling.
Ensure final resume looks clean, professional, and well-structured.

DATA TO USE
PERSONAL INFORMATION:
Name: ${personalInfo.firstName} ${personalInfo.lastName}
Email: ${personalInfo.emailAddress}
Phone: ${personalInfo.phoneNumber}
Location: ${personalInfo.city}, ${personalInfo.state}, ${
      personalInfo.countryRegion
    }
Address: ${personalInfo.address}, ${personalInfo.zipCode}

CONTACT LINKS:
LinkedIn: ${contactInfo.linkedIn || "Not provided"}
Portfolio: ${contactInfo.portfolio || "Not provided"}
GitHub: ${contactInfo.other || "Not provided"}

CAREER SUMMARY:
Job Title: ${careerSummary.jobTitle}
${careerSummary.jobDescription}

WORK EXPERIENCE:
${
  experience.entries && experience.entries.length > 0
    ? experience.entries
        .map(
          (exp: ExperienceEntry) => `

Position: ${exp.jobTitle} at ${exp.companyName}
Duration: ${
            exp.durationStart
              ? new Date(exp.durationStart).toLocaleDateString()
              : "N/A"
          } - ${exp.durationEnd ? "Present" : "N/A"}
Description: ${exp.description}
Skills: ${(exp.skills || []).join(", ")}
`
        )
        .join("\n")
    : "No work experience provided"
}

EDUCATION:
${
  education.entries && education.entries.length > 0
    ? education.entries
        .map(
          (edu: EducationEntry) => `

${edu.degree} in ${edu.major}
${edu.institutionName}
${
  edu.graduationStart
    ? new Date(edu.graduationStart).toLocaleDateString()
    : "N/A"
} - ${edu.graduationEnd ? "Present" : "N/A"}
`
        )
        .join("\n")
    : "No education provided"
}

CERTIFICATIONS:
${
  certificate?.entries && certificate.entries.length > 0
    ? certificate.entries
        .map(
          (cert: CertificateEntry) => `

${cert.title}
Issued by: ${cert.issuingOrganization}
Issue Date: ${
            cert.issueDate
              ? new Date(cert.issueDate).toLocaleDateString()
              : "N/A"
          }
${cert.expiryDate ? `Expiry Date: ${cert.expiryDate}` : "No expiry"}
`
        )
        .join("\n")
    : "No certifications provided"
}

HTML STRUCTURE YOU MUST FOLLOW

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ATS Friendly Resume Template</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">

    <div class="bg-white">

        <header class="text-center mb-6">
            <h1 class="text-3xl font-bold uppercase text-gray-800" id="name-placeholder">
                [YOUR FULL NAME]
            </h1>
            <div class="flex justify-center flex-wrap gap-x-4 text-gray-600 text-sm mt-1">
                <span id="phone-placeholder">[123] 456-7890</span>
                <span class="hidden sm:inline">|</span>
                <span id="email-placeholder">[email@example.com]</span>
                <span class="hidden sm:inline">|</span>
                <a href="#" class="hover:underline" id="linkedin-placeholder">
                    [LinkedIn URL]
                </a>
                <span class="hidden sm:inline">|</span>
                <a href="#" class="hover:underline" id="portfolio-placeholder">
                    [Portfolio/Github URL]
                </a>
            </div>
        </header>

        <section class="mb-6">
            <h2 class="text-xl font-bold uppercase border-b-2 border-gray-400 pb-1 text-gray-700">
                Summary / Professional Profile
            </h2>
            <p class="mt-2" id="summary-placeholder">
                [Highly motivated and results-driven professional with X years of experience in Y field. Proven ability to Z. Seeking to leverage skills in A and B to contribute to a challenging and growth-oriented team.]
            </p>
        </section>

        <section class="mb-6">
            <h2 class="text-xl font-bold uppercase border-b-2 border-gray-400 pb-1 text-gray-700">
                Technical Skills
            </h2>
            <div class="mt-2">
                <p>
                    <span class="font-semibold text-gray-700">Languages:</span> 
                    <span id="languages-placeholder">[Python, JavaScript, SQL, Java]</span>
                </p>
                <p>
                    <span class="font-semibold text-gray-700">Frameworks/Tools:</span> 
                    <span id="frameworks-placeholder">[React, Node.js, Django, AWS, Docker, Git]</span>
                </p>
                <p>
                    <span class="font-semibold text-gray-700">Databases:</span> 
                    <span id="databases-placeholder">[PostgreSQL, MongoDB, MySQL]</span>
                </p>
            </div>
        </section>

        <section class="mb-6">
            <h2 class="text-xl font-bold uppercase border-b-2 border-gray-400 pb-1 text-gray-700">
                Professional Experience
            </h2>

            <div class="mt-4" id="job1-container">
                <div class="flex justify-between items-start">
                    <h3 class="text-lg font-semibold text-gray-800" id="job1-title-placeholder">
                        [Job Title]
                    </h3>
                    <span class="text-sm font-medium text-gray-600" id="job1-dates-placeholder">
                        [Start Date] – [End Date]
                    </span>
                </div>
                <p class="italic text-gray-700" id="job1-company-placeholder">
                    [Company Name] | [City, State]
                </p>
                <ul class="list-disc ml-6 mt-1 space-y-1">
                    <li id="job1-bullet1-placeholder">
                        [**Achievement-focused bullet point 1:** Used **action verb** to achieve **quantifiable result** by implementing **specific skill/tool**.]
                    </li>
                    <li id="job1-bullet2-placeholder">
                        [**Achievement-focused bullet point 2:** Managed a team of X, leading to a Y% increase in Z efficiency over a 6-month period.]
                    </li>
                    <li id="job1-bullet3-placeholder">
                        [**Achievement-focused bullet point 3:** Developed and launched new feature that resulted in 10k new user registrations in the first quarter.]
                    </li>
                </ul>
            </div>

            <div class="mt-4" id="job2-container">
                <div class="flex justify-between items-start">
                    <h3 class="text-lg font-semibold text-gray-800" id="job2-title-placeholder">
                        [Previous Job Title]
                    </h3>
                    <span class="text-sm font-medium text-gray-600" id="job2-dates-placeholder">
                        [Start Date] – [End Date]
                    </span>
                </div>
                <p class="italic text-gray-700" id="job2-company-placeholder">
                    [Previous Company Name] | [City, State]
                </p>
                <ul class="list-disc ml-6 mt-1 space-y-1">
                    <li id="job2-bullet1-placeholder">
                        [**Achievement-focused bullet point 1:** Description of key responsibility and quantifiable impact.]
                    </li>
                    <li id="job2-bullet2-placeholder">
                        [**Achievement-focused bullet point 2:** Description of project or initiative and its positive outcome.]
                    </li>
                </ul>
            </div>
            
        </section>

        <section class="mb-6">
            <h2 class="text-xl font-bold uppercase border-b-2 border-gray-400 pb-1 text-gray-700">
                Education
            </h2>

            <div class="mt-4" id="education1-container">
                <div class="flex justify-between items-start">
                    <h3 class="text-lg font-semibold text-gray-800" id="education1-degree-placeholder">
                        [Degree Name, e.g., B.S. in Computer Science]
                    </h3>
                    <span class="text-sm font-medium text-gray-600" id="education1-dates-placeholder">
                        [Graduation Year]
                    </span>
                </div>
                <p class="italic text-gray-700" id="education1-institution-placeholder">
                    [University/Institution Name] | [City, State]
                </p>
                </div>
            
        </section>

        <section>
            <h2 class="text-xl font-bold uppercase border-b-2 border-gray-400 pb-1 text-gray-700">
                Certifications & Awards
            </h2>
            <ul class="list-disc ml-6 mt-2 space-y-1">
                <li id="certification1-placeholder">
                    [Certification Name (Issuing Organization) - Year Acquired]
                </li>
                <li id="award1-placeholder">
                    [Award Name - Year]
                </li>
            </ul>
        </section>

    </div>

</body>
</html>

FINAL INSTRUCTION

Generate the full resume in pure HTML ONLY. No commentary. No Markdown. No backticks. No placeholders. Only final HTML.`;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
    });

    return text;
  } catch (error) {
    console.error("Error generating resume:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate resume"
    );
  }
}
