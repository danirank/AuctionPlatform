
import { useState } from "react";
import CreateAuctionForm from "../../components/NewAuctionForm/NewAuctionForm";
import type { CreateAuctionType } from "../../types/Types";
import { CreateAuction } from "../../services/AuctionService/AuctionsService";

function CreateAuctionContainer() {
  const [values, setValues] = useState<CreateAuctionType>({
    title: "",
    description: "",
    startPrice: 0,
    imageUrl: "",
    startAtUtc: "",
    endAtUtc: "",
  });

  const [rootError, setRootError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = <K extends keyof CreateAuctionType>(
    name: K,
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: name === "startPrice" ? Number(value) : value,
    }));

    setRootError("");
  };

  const handleSubmit = async () => {
    setRootError("");

    try {
      setIsSubmitting(true);

      const result = await CreateAuction(values);

      if (!result) {
        setRootError("Kunde inte skapa auktionen. Försök igen.");
        return;
      }

      

      // TODO: navigera bort / reset form / refetch auctions
      alert("Auktion skapad!");
    } catch (err) {
      setRootError("Något gick fel. Försök igen.");
      console.error("Create auction error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CreateAuctionForm
      values={values}
      rootError={rootError}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default CreateAuctionContainer;
