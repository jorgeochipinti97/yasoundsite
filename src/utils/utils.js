import axios from "axios";
import gsap, { Power1 } from "gsap";

export const formatCurrency = (value) => {
  // Crear formateador
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(value); //$2,500.00
};


export async function updatePoints(user, numberOfPoints) {
  try {
    const updatedUser = {
      ...user,
      points: user.points + numberOfPoints
    };
    const response = await axios.put(`api/users`, updatedUser);
  
    if (response.status === 200) {
      console.log('Usuario actualizado correctamente:', response.data);
      return response.data; // Devuelve los datos actualizados del usuario
    } else {
      throw new Error('La actualización del usuario no fue exitosa.');
    }
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;  // Propagar el error para manejo adicional si es necesario
  }
}


// export const handleProductUpdateOrCreate = async (
//   product,
//   productData,
//   user
// ) => {
//   try {
//     let response;
//     if (product?._id) {
//       createProduct = await axios.put(
//         `/api/products/${product._id}`,
//         productData
//       );
//       await axios.put("/api/users", {
//         _id: user._id,
//         products: [...user.products, createProduct.data.data._id],
//       });
//     } else {
//       await axios.post("/api/products", productData);
//       await axios.put("/api/users", {
//         _id: user._id,
//         products: [...user.products, response.data.data._id],
//       });
//     }

//     // Gestión de UI post operación

//     showAlert("Éxito", "Producto actualizado con éxito");
//     gsap.to(".pantallacarga", {
//       opacity: 0,
//       ease: Power1.easeIn,
//       display: "none",
//       delay: 1,
//     });


//   } catch (error) {
//     console.error("Error al manejar el producto:", error);
//     showAlert("Error", "Hubo un problema al procesar tu solicitud.");
//   } finally {
//     setIsLoading(false);
//   }
// };

// export async function uploadImage(image) {
//   const formData = new FormData();
//   formData.append("file", image);
//   formData.append("username", user.username);
//   const response = await axios.post("/api/s3", formData);
//   return response.data ? response.data.fileUrl : null;
// }

// export async function deleteImage(url) {
//   const urlParts = url.split("/");
//   const fileName_ = urlParts.pop();
//   await axios.put("/api/s3", {
//     fileName: fileName_,
//   });
// }

// export async function uploadfile(selectedFile, fileData) {
//   const originalName = selectedFile.name;

//   const extension = originalName.split(".").pop();

//   const fileName = `${user.username}-${Date.now()}.${extension}`;

//   const fileData = {
//     fileName: fileName,
//     fileType: selectedFile.type,
//   };
//   const getSigned = await axios.post("/api/getSigned", fileData);
//   getSigned &&
//     (await axios.put(response.data.url, selectedFile, {
//       headers: {
//         "Content-Type": fileData.fileType,
//       },
//     }));

//   return fileName;
// }
