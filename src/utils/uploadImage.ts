import { supabase } from "../supabaseClient";

export const uploadImage = async (file?: File) => {
    try {
        if (!file) {
            throw new Error("You must select an image to upload");
        }

        await supabase
            .storage
            .listBuckets()
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })

        const fileExt = file.name.split(".").pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = fileName;

        await supabase.storage.from("images").upload(filePath, file);

        return { filePath, fileName }
    } catch (error) {
        alert(error)
    }
}