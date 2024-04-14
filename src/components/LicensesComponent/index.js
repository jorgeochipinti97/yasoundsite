import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

export const LicensesComponent = ({ license, onLicenseUpdate }) => {
  const [isChecked, setIsChecked] = useState();

  const onLicenseChange = (checked) => {
    checked && setIsChecked(checked);
    !checked && setIsChecked(checked);
  };

  const [licenseDetails, setLicenseDetails] = useState({
    title: license.title,
    price: "",
    priceArs: "",
    description: license.description,
  });


  useEffect(() => {
    if (isChecked) {
      onLicenseUpdate(licenseDetails);
    } else {
      onLicenseUpdate(null); // Puedes decidir enviar null o eliminar esta licencia del estado global
    }
    console.log(license)
  }, [isChecked, licenseDetails, onLicenseUpdate]);

  const handleInputChange = (name, value) => {
    setLicenseDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="my-5">
      <div className="flex">
        <input
          type="checkbox"
          className="mr-2"
          onChange={(e) => onLicenseChange(e.target.checked)}
        />
        <p className="fon-geist font-bold tracking-tighter">{license.title}</p>
      </div>

      <div className="flex flex-col">
        {isChecked && (
          <div className="flex flex-col">
            <Input
              placeholder="Precio USD"
              className="my-1"
              value={licenseDetails.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
            <Input
              placeholder="Precio ARS"
              className="my-1"
              value={licenseDetails.priceArs}
              onChange={(e) => handleInputChange("priceArs", e.target.value)}
            />
          </div>
        )}
      </div>

      <Separator className="my-2" />
    </div>
  );
};
