import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(cabinData) {
  const { id, ...newCabin } = cabinData;

  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl);

  let imageName;
  if (!hasImagePath && newCabin.image && newCabin.image.name) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  } else {
    imageName = null;
  }

  const imagePath = hasImagePath
    ? newCabin.image
    : imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : "";

  let query;

  if (id) {
    // ✅ Editing an existing cabin
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  } else {
    // ✅ Creating a new cabin
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("❌ Supabase query error:", error);
    throw new Error("Cabin could not be created/edited");
  }

  // Image upload (if needed)
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image upload failed — cabin rolled back");
  }

  return data;
}

export async function duplicateCabin(originalCabin) {
  const duplicatedCabin = {
    ...originalCabin,
    name: `Duplicate - ${originalCabin.name}`,
    id: undefined,
  };

  return await createEditCabin(duplicatedCabin);
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

