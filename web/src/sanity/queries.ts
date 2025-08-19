import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  ogImage{asset->{url}}
}`;

export const projectsQuery = groq`*[_type == "project"]|order(orderRank asc){
  _id,
  title,
  description,
  tags,
  demoUrl,
  repoUrl,
  cover{asset->{url}}
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  headline,
  body,
  avatar{asset->{url}},
  location,
  email,
  phone
}`;

export const skillsQuery = groq`*[_type == "skill"]|order(orderRank asc){
  _id,
  category,
  items,
}`;

export const educationQuery = groq`*[_type == "education"]|order(orderRank asc){
  _id,
  degree,
  institution,
  details,
  startYear,
  endYear,
  gpa,
}`;

export const experienceQuery = groq`*[_type == "experience"]|order(orderRank asc){
  _id,
  role,
  company,
  start,
  end,
  bullets,
  links
}`;

export const venturesQuery = groq`*[_type == "venture"]|order(orderRank asc){
  _id,
  name,
  role,
  start,
  end,
  bullets,
  links,
  media
}`;

export const certificationsQuery = groq`*[_type == "certification"]|order(orderRank asc){
  _id,
  title,
  issuer,
  date,
  url
}`;

