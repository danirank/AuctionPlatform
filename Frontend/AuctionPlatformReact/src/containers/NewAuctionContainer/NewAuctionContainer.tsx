// src/containers/CreateAuctionContainer/CreateAuctionContainer.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import AuctionForm from "../../components/AuctionForm/AuctionForm";
import type { AuctionFormValues, CreateAuctionType } from "../../types/Types";
import { useAuctions } from "../../context/AuctionProvider";

function CreateAuctionContainer() {
  const { createAuction } = useAuctions();
  const navigate = useNavigate();

  const [values, setValues] = useState<AuctionFormValues>({
    title: "",
    description: "",
    startPrice: 0,
    imageUrl: "",
    startAtUtc: "",
    endAtUtc: "",
    hasBid: false
  });

  const [rootError, setRootError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = <K extends keyof AuctionFormValues>(name: K, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: name === "startPrice" ? Number(value) : value,
    }));
    setRootError("");
  };

  const handleSubmit = async () => {
    setRootError("");
    setIsSubmitting(true);

    try {
      const dto: CreateAuctionType = {
        title: values.title,
        description: values.description,
        startPrice: values.startPrice,
        imageUrl: values.imageUrl,
        startAtUtc: values.startAtUtc,
        endAtUtc: values.endAtUtc,
      };

      const created = await createAuction(dto);

      if (!created) {
        setRootError("Kunde inte skapa auktionen. Försök igen.");
        return;
      }

      navigate("/mypage/auctions");
    } catch (err) {
      console.error("Create auction error:", err);
      setRootError("Något gick fel. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuctionForm
      values={values}
      rootError={rootError}
      isSubmitting={isSubmitting}
      title="Skapa auktion"
      submitText="Skapa"
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default CreateAuctionContainer;
