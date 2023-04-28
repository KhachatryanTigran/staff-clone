export const CV = [
  {
    title: "Summary",
    lable:
      "Add a short professional introduction by highlighting your most valuable skills and experiences in a few sentences.",
    data: {
      options: [],
      levels: [],
      title: "Add summary to highlight your experience.",
    },
  },
  {
    title: "Work experience",
    lable: "Add your work experience and any significant accomplishments.",
    data: {
      options: [],
      levels: ["Company name", "Job Title", "Location:"],
      title:
        "Job details: (Provide details covering this job position. Include information about your responsibilities, about the company and any other details that might interest your potential employer.)",
    },
  },
  {
    title: "Education and training",
    lable: "Add your education and professional training.",
    data: {
      options: [],
      levels: [
        "University/Organization name:",
        "Degree/certificate:",
        "Location:",
      ],
      title:
        "Education Details: (Provide an overview of the course, degree or training so that employers have better idea on your academic background.)",
    },
  },
  {
    title: "Volunteer Experience",
    lable: "Add your volunteer experience.",
    data: {
      options: [],
      levels: ["Company name", "Job Title", "Location:"],
      title: "Volunteering details:",
    },
  },
  {
    title: "Professional skills",
    lable:
      "Professional skills are the skill-set often learned on the job or through education and training. It’s easy to measure.",
    data: {
      options: [
        "ASP.NET MVC",
        "jQuery",
        "PHP Zend Framework",
        "Selenium ",
        "JavaScript Frameworks",
        "3D modeling",
        "3ds Max",
        "ACCA",
        "Adobe After Effects",
        "Adobe Audition",
        "Adobe Photoshop",
        "Adobe Premiere Pro",
        "Android NDK",
        "C programming",
      ],
      levels: ["Beginner", "Mid", "Good", "Excellent"],
      title:
        "You can add up to 10 skills and provide level of proficiency for each one. If you can’t find required skill, you can Request below. Please note that total number of skills, including requested, cannot exceed 10.",
    },
  },
  {
    title: "Personal skills",
    lable:
      "Personal skills are soft skills that characterize a person’s attitude, relationships with others and harder to quantify.",
    data: {
      options: [
        "Ability to work independently",
        "Personal branding ",
        "Leadership skills",
        "Artistic skills ",
        "Written communication skills",
        "Design skills",
        "Positive attitude",
        "Time management ",
        "Problem solving ",
        "Conflict resolution skills",
        "Customer/service oriented",
        "Public speaking ",
        "Adaptability",
        "Entrepreneurial thinking ",
      ],
      levels: [],
      title:
        "Please add up to 10 soft skills that best describe you from professional perspective. If you can’t find required skill, you can Request below. Please note that total number of skills, including requested, cannot exceed 10.",
    },
  },
  {
    title: "Languages",
    lable: "Add levels of language proficiency.",
    data: {
      options: [
        "Armenian",
        "Russian",
        "English",
        "Spanish",
        "German",
        "French",
        "Georgian",
        "Portugese",
      ],
      levels: ["Beginner", "Advanced", "Full proficiency", "Native"],
      title: "Choose the level for your languages.",
    },
  },

  {
    title: "Additional information",
    lable:
      "Add information that you may consider important and may help you get the job.",
    data: {
      options: [],
      levels: [],
      title:
        "Any other useful information that will help you stand out from the crowd and provide more information on your background.",
    },
  },
  {
    title: "Interests and Hobbies",
    lable:
      "Adding hobbies and interests can help provide additional support and personalize your CV.",
    data: {
      options: [],
      levels: [],
      title:
        "Hobbies and interests represent what you love to do, try to include hobbies and interests that describe you.",
    },
  },
];

export const TYPES = {
  editor: ["Interests and Hobbies", "Additional information", "Summary"],
  formEditor: [
    "Work experience",
    "Education and training",
    "Volunteer Experience",
  ],
  levelSlider: ["Languages", "Professional skills"],
  autocomplete: ["Personal skills"],
};
