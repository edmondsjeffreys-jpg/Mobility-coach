import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { routines, routineNames } from "./exercises";
import "./styles.css";

function App() {
  const [tab, setTab] = useState("Night");
  const [idx, setIdx] = useState(0);

  const [logs, setLogs] = useState(() =>
    JSON.parse(localStorage.getItem("mobility-logs") || "[]")
  );

  const [feel, setFeel] = useState("Good");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pain, setPain] = useState(false);

  const [coachOpen, setCoachOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [coachReply, setCoachReply] = useState("");
  const [loading, setLoading] = useState(false);

  const list = routines[tab];
  const ex = list[idx];

  function switchTab(nextTab) {
    setTab(nextTab);
    setIdx(0);
    setFeel("Good");
    setAmount("");
    setNote("");
    setPain(false);
  }

  function saveEntry(skipped = false) {
    const entry = {
      ts: new Date().toISOString(),
      routine: tab,
      exerciseId: ex.id,
      exercise: ex.name,
      dose: `${ex.target} ${ex.unit}`,
      amount,
      feel,
      note,
      pain,
      skipped,
      tags: ex.tags,
      version: 1,
    };

    const nextLogs = [...logs, entry];

    setLogs(nextLogs);

    localStorage.setItem(
      "mobility-logs",
      JSON.stringify(nextLogs)
    );

    setAmount("");
    setNote("");
    setFeel("Good");
    setPain(false);

    if (idx < list.length - 1) {
      setIdx(idx + 1);
    }
  }

  async function askCoach(event) {
    event.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setCoachReply("");

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          context: logs.slice(-40),
          routines,
        }),
      });

      const data = await response.json();

      setCoachReply(
        data.answer ||
          data.error ||
          "Coach is unavailable."
      );
    } catch {
      setCoachReply(
        "AI Coach is not connected right now."
      );
    } finally {
      setLoading(false);
    }
  }

  const completedForRoutine = logs.filter(
    (item) => item.routine === tab
  ).length;

  const goodCount = logs.filter(
    (item) =>
      item.feel === "Good" ||
      item.feel === "Easy"
  ).length;

  const uniqueDays = new Set(
    logs.map((item) => item.ts.slice(0, 10))
  ).size;

  return (
    <main className="app">
      <header>
        <div>
          <div className="kicker">
            Personal mobility
          </div>
          <h1>Mobility Coach</h1>
        </div>

        <button
          className="coachBtn"
          onClick={() => setCoachOpen(true)}
        >
          AI Coach
        </button>
      </header>

      <nav className="tabs">
        {routineNames.map((item) => (
          <button
            key={item}
            onClick={() => switchTab(item)}
            className={tab === item ? "active" : ""}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="progress">
        <div
          style={{
            width: `${
              ((idx + 1) / list.length) * 100
            }%`,
          }}
        />
      </div>

      <section className="card">
        <div className="topline">
          <span>
            {tab} • {idx + 1}/{list.length}
          </span>

          <b>
            {ex.target} {ex.unit}
          </b>
        </div>

        <div className="exerciseImageWrap">
          <img
            src={ex.image}
            alt={`Diagram for ${ex.name}`}
            className="exerciseImage"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />

          <div className="figure">
            {idx + 1}
          </div>
        </div>

        <h2>{ex.name}</h2>

        <div className="tagRow">
          {ex.tags.map((tag) => (
            <span
              className="tag"
              key={tag}
            >
              {tag}
            </span>
          ))}

          {ex.core && (
            <span className="tag coreTag">
              Core
            </span>
          )}
        </div>

        <div className="info">
          <h3>Instructions</h3>
          <p>{ex.instructions}</p>
        </div>

        <div className="breath">
          <h3>Breathing</h3>
          <p>{ex.breathing}</p>
        </div>

        <div className="doseBox">
          <strong>
            Target
          </strong>

          <span>
            {ex.target} {ex.unit}
          </span>
        </div>

        <label>
          What did you complete?
        </label>

        <input
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value)
          }
          placeholder={
            ex.type === "timer"
              ? "seconds completed"
              : "reps completed"
          }
        />

        <label>
          How did it feel?
        </label>

        <div className="feel">
          {[
            "Easy",
            "Good",
            "Challenging",
            "Too much",
          ].map((item) => (
            <button
              key={item}
              className={
                feel === item ? "sel" : ""
              }
              onClick={() => setFeel(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="painRow">
          <input
            type="checkbox"
            checked={pain}
            onChange={(event) =>
              setPain(event.target.checked)
            }
          />

          <span>
            I felt pain or pinching
          </span>
        </label>

        <label>
          Note (optional)
        </label>

        <textarea
          value={note}
          onChange={(event) =>
            setNote(event.target.value)
          }
          placeholder="Tighter on left, ankle felt better, etc."
        />

        <div className="secondaryActions">
          <button
            onClick={() =>
              saveEntry(true)
            }
          >
            Skip
          </button>

          {ex.quickPriority === 1 && (
            <span className="quickBadge">
              Quick-session priority
            </span>
          )}
        </div>

        <div className="actions">
          <button
            disabled={idx === 0}
            onClick={() =>
              setIdx(Math.max(0, idx - 1))
            }
          >
            Back
          </button>

          <button
            className="primary"
            onClick={() =>
              saveEntry(false)
            }
          >
            {idx === list.length - 1
              ? "Finish + Save"
              : "Save + Next"}
          </button>
        </div>
      </section>

      <section className="stats">
        <div>
          <b>
            {completedForRoutine}
          </b>
          <span>Logs</span>
        </div>

        <div>
          <b>
            {goodCount}
          </b>
          <span>Good/Easy</span>
        </div>

        <div>
          <b>
            {uniqueDays}
          </b>
          <span>Days</span>
        </div>
      </section>

      {coachOpen && (
        <div
          className="backdrop"
          onClick={() =>
            setCoachOpen(false)
          }
        >
          <section
            className="modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="modalHead">
              <div>
                <div className="kicker">
                  AI Coach
                </div>

                <h2>
                  Ask about your routine
                </h2>
              </div>

              <button
                onClick={() =>
                  setCoachOpen(false)
                }
              >
                ×
              </button>
            </div>

            <p className="muted">
              The coach can use your recent
              logs, exercise tags, pain flags,
              and routine history to suggest
              progressions or changes.
            </p>

            <form
              onSubmit={askCoach}
            >
              <textarea
                value={question}
                onChange={(event) =>
                  setQuestion(
                    event.target.value
                  )
                }
                placeholder="My ankles are improving, but my hips still feel stiff. What should I change?"
              />

              <button
                className="primary"
                disabled={loading}
              >
                {loading
                  ? "Thinking…"
                  : "Ask Coach"}
              </button>
            </form>

            {coachReply && (
              <div className="reply">
                {coachReply}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
