import { nanoid } from "nanoid";
import { coverPictureURL } from "../assets/picture";
import { Page } from "./types";

export const createPage = () => {
    const slug = nanoid();
    const id = nanoid();
  
    const page: Page = {
      slug,
      id,
      title: "Untitled",
      cover: coverPictureURL,
      nodes: []
    }
    return page
  }