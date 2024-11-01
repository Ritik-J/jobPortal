import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getComapanies(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.log("error in fetching companies", error.message, error.hint);
    return null;
  }

  return data;
}

export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error } = await supabase.storage
    .from("comapny-logo")
    .upload(fileName, companyData.logo);
  console.log(companyData);

  if (error) {
    console.log("error in fetching companies", error.message);
    return null;
  }
  const logo_url = `${supabaseUrl}/storage/v1/object/public/comapny-logo/${fileName}`;

  const { data, error: companyError } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url: logo_url,
      },
    ])
    .select();

  if (companyError) {
    console.error(companyError);
    throw new Error("Error submitting Companys");
  }

  return data;
}
