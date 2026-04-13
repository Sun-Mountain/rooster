export const dateFormat = (dateString: string) => {
  const date = dateString.split("T")[0].split("-");

  return `${date[1]}/${date[2]}/${date[0]}`
}