
import styles from "./AuctionForm.module.css";
import type { AuctionFormValues } from "../../types/Types";


interface Props {
  values: AuctionFormValues;
  rootError: string;
  isSubmitting: boolean;
  title: string;
  submitText: string;

  onChange: <K extends keyof AuctionFormValues>(name: K, value: string) => void;
  onSubmit: () => void | Promise<void>;
}

function AuctionForm({
  values,
  rootError,
  isSubmitting,
  title,
  submitText,
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
        <h2>{title}</h2>

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
            value={values.title}
            onChange={(e) => onChange("title", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Beskrivning</label>
          <textarea
            id="description"
            value={values.description}
            onChange={(e) => onChange("description", e.target.value)}
            required
          />
        </div>

        <div className={values.hasBid ? styles.disabled : ""} >
          <label htmlFor="startPrice">Startpris</label>
          <input
            id="startPrice"
            type="number"
            min="0"
            step="0.01"
            value={values.startPrice}
            onChange={(e) => onChange("startPrice", e.target.value)}
            required
            disabled = {values.hasBid}
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Bild-URL</label>
          <input
            id="imageUrl"
            type="text"
            value={values.imageUrl}
            onChange={(e) => onChange("imageUrl", e.target.value)}
          />
        </div>

        <div >
          <label htmlFor="startAtUtc">Startdatum</label>
          <input
            id="startAtUtc"
            type="datetime-local"
            value={values.startAtUtc}
            onChange={(e) => onChange("startAtUtc", e.target.value)}
            required
            disabled = {values.hasBid}

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
          {isSubmitting ? `${submitText}...` : submitText}
        </button>
      </form>
    </div>
  );
}


export default AuctionForm;
