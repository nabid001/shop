import { defineField, defineType } from "sanity";

export const userSchema = defineType({
  title: "User",
  name: "user",
  type: "document",
  fields: [
    defineField({
      title: "Username",
      name: "username",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(20),
    }),
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(20),
    }),
    defineField({
      title: "Email",
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      title: "ClerkId",
      name: "clerkId",
      type: "string",
      validation: (Rule) => Rule.required().warning("ClerkId is recommended"),
    }),
    defineField({
      title: "Picture",
      name: "picture",
      type: "string",
    }),
  ],
});
