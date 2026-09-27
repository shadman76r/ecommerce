import React, { useMemo, useState } from "react";
import "./Comments.css";

function initialsOf(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Comments({ comments }) {
  const [draft, setDraft] = useState("");
  const [draftRating, setDraftRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [posted, setPosted] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setPosted((prev) => [
      {
        id: `local-${Date.now()}`,
        name: "You",
        rating: draftRating,
        text: draft.trim(),
        isNew: true
      },
      ...prev
    ]);
    setDraft("");
    setDraftRating(5);
  };

  const allComments = useMemo(() => [...posted, ...comments], [posted, comments]);

  const average = useMemo(() => {
    if (allComments.length === 0) return 0;
    const sum = allComments.reduce((total, c) => total + c.rating, 0);
    return (sum / allComments.length).toFixed(1);
  }, [allComments]);

  return (
    <section className="section comments-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2>What customers say</h2>
            <p>Real notes from recent orders</p>
          </div>
          {allComments.length > 0 && (
            <div className="rating-summary">
              <span className="rating-summary-score">{average}</span>
              <div className="rating-summary-meta">
                <span className="comment-stars">{"★".repeat(Math.round(average))}</span>
                <span className="rating-summary-count">{allComments.length} reviews</span>
              </div>
            </div>
          )}
        </div>

        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="comment-form-header">
            <span className="comment-form-label">Your rating</span>
            <div className="star-picker" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star-picker-btn${
                    star <= (hoverRating || draftRating) ? " filled" : ""
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => setDraftRating(star)}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Share your experience with a recent order..."
            rows={3}
          />
          <div className="comment-form-footer">
            <button type="submit" className="btn-primary">
              Post comment
            </button>
          </div>
        </form>

        <div className="comments-grid">
          {allComments.map((c) => (
            <div className={`comment-card${c.isNew ? " is-new" : ""}`} key={c.id}>
              <div className="comment-top">
                <div className="comment-identity">
                  <span className="comment-avatar">{initialsOf(c.name)}</span>
                  <div>
                    <span className="comment-name">{c.name}</span>
                    {c.product && <span className="comment-product">On {c.product}</span>}
                  </div>
                </div>
                <span className="comment-stars">{"★".repeat(c.rating)}</span>
              </div>
              <p className="comment-text">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
