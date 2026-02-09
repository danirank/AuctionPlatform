
import styles from "./NewAuctionForm.module.css";
import type { CreateAuctionType } from "../../types/Types";

interface Props {
  values: CreateAuctionType;
  rootError: string;
  isSubmitting: boolean;

  onChange: <K extends keyof CreateAuctionType>(
    name: K,
    value: string
  ) => void;

  onSubmit: () => void | Promise<void>;
}

function CreateAuctionForm({
  values,
  rootError,
  isSubmitting,
  onChange,
  onSubmit,
}: Props) {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
  <div className={styles.container}>
    <form className={styles.form} onSubmit={submit} noValidate>
      <h2>Skapa auktion</h2>

      {rootError && (
        <p className={styles.formError} role="alert">
          {rootError}
        </p>
      )}

      <div>
        <label htmlFor="title">Titel</label>
        <input
          id="title"
          type="text"
          placeholder="Titel"
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Beskrivning</label>
        <textarea
          id="description"
          placeholder="Beskrivning"
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="startPrice">Startpris</label>
        <input
          id="startPrice"
          type="number"
          placeholder="Startpris"
          value={values.startPrice}
          onChange={(e) => onChange("startPrice", e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="imageUrl">Bild-URL</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Bild-URL"
          value={values.imageUrl}
          onChange={(e) => onChange("imageUrl", e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="startAtUtc">Startdatum</label>
        <input
          id="startAtUtc"
          type="datetime-local"
          value={values.startAtUtc}
          onChange={(e) => onChange("startAtUtc", e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="endAtUtc">Slutdatum</label>
        <input
          id="endAtUtc"
          type="datetime-local"
          value={values.endAtUtc}
          onChange={(e) => onChange("endAtUtc", e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Skapar..." : "Skapa auktion"}
      </button>
    </form>
  </div>
);

}

export default CreateAuctionForm;
