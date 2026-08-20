// Single source of truth for the identity + contact details that show up in the
// contact page, the footer, the terminal, and the search index.
export const profile = {
  name: "Khaled Salleh",
  handle: "khal1dx",
  title: "Software Engineer & AI Developer",
  location: "Cairo, Egypt",
  currentRole: "Software Engineer at Agile Worx",
  email: "khaledmohamedsalleh@gmail.com",
  phone: "+20 1014334387",
  phoneHref: "tel:+201014334387",
  mapsUrl: "https://maps.google.com/?q=Cairo,+Egypt",
  // Served from public/. Keep this in sync with resume/cv.tex by re-running
  // pdflatex and copying cv.pdf over public/Khaled_Salleh_CV.pdf.
  cvUrl: "/Khaled_Salleh_CV.pdf",
  socials: {
    github: "https://github.com/kha1dx",
    linkedin: "https://linkedin.com/in/khal1dx",
  },
} as const;

export const emailHref = `mailto:${profile.email}`;
