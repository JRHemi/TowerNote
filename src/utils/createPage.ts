import { nanoid } from "nanoid";
import { coverPictureURL } from "../assets/picture";
import { supabase } from "../supabaseClient";

export const createPage = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) {
    throw new Error("You must be logged in to create a page.");
  }

  const slug = nanoid();

  const page = {
    slug,
    id: undefined,
    title: "Untitled",
    cover: coverPictureURL,
    nodes: [],
  };

	await supabase.from("pages").insert(page);
	const { data: pageData } = await supabase
		.from("pages")
		.select("id")
		.match({ slug, created_by: user.id })
		.single();

	page.id = pageData?.id;

  return page;
};
