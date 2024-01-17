import React, { useState } from "react";

const Modify = ({
  customerData,
  modifyCustomer,
  setShowCard,
  updateCustomer,
}) => {
  const [formData, setFormData] = useState({
    name: customerData.name,
    address: customerData.address,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleModifyClick = async () => {
    try {
      console.log("Updating customer:", formData);

      const response = await fetch(
        `http://localhost:9090/api/customers/${customerData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Update response:", response);

      if (!response.ok) {
        throw new Error("Failed to update customer");
      }

      modifyCustomer(formData);

      updateCustomer(formData);

      setShowCard(false);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-base-300 bg-opacity-70 flex justify-center items-center">
      <div className="bg-base-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Modify Customer</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold mb-2">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={handleModifyClick}>
            Modify
          </button>
          <button
            className="btn btn-secondary ml-2"
            onClick={() => setShowCard(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modify;
