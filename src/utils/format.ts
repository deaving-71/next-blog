export function getFormattedDate(date: string | undefined) {
  if (!date) return "???";

  return new Date(date).toLocaleDateString("en-us", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function objectToFormData(obj: { [key: string]: any }): FormData {
  const formData = new FormData();
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(key, val));
        continue;
      }

      formData.append(key, value);
    }
  }
  return formData;
}

export function formDataToObject(formData: FormData): { [key: string]: any } {
  const object: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    if (key === "thumbnail") return;
    if (key === "keywords") {
      object[key] = formData.getAll(key);
      return;
    }
    object[key] = value;
  });
  return object;
}
