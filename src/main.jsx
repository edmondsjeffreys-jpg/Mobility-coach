import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { routines, routineNames } from "./exercises";
import "./styles.css";

const todayKey = () =>
  new Date().toLocaleDateString("en-CA");

const prettyDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

function normalizeLogs() {
  try {
    const raw = JSON.parse(
      localStorage.getItem("mobility-logs") || "[]"
    );

    if (!Array.isArray(raw)) return [];

    return raw.map((item, index) => {
      const timestamp =
        item.ts || new Date().toISOString();

      return {
        ...item,

        id:
          item.id ||
          `legacy-${timestamp}-${index}`,

        date:
          item.date ||
          new Date(timestamp).toLocaleDateString(
            "en-CA"
          ),
      };
    });
  } catch {
    return [];
  }
}

function App() {
  const [tab, setTab] = useState("Night");
  const [idx, setIdx] = useState(0);

  const [logs, setLogs] =
    useState(normalizeLogs);

  const [feel, setFeel] =
    useState("Good");

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  const [pain, setPain] =
    useState(false);

  const [details, setDetails] =
    useState(false);

  const [coachOpen, setCoachOpen] =
    useState(false);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [question, setQuestion] =
    useState("");

  const [coachReply, setCoachReply] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    duplicatePrompt,
    setDuplicatePrompt,
  ] = useState(false);

  const [pendingSave, setPendingSave] =
    useState(null);

  const [saveLocked, setSaveLocked] =
    useState(false);

  const [imageFailed, setImageFailed] =
    useState(false);

  const list = routines[tab] || [];
  const ex = list[idx];

  const date = todayKey();

  useEffect(() => {
    setImageFailed(false);
  }, [tab, idx]);

  useEffect(() => {
    localStorage.setItem(
      "mobility-logs",
      JSON.stringify(logs)
    );
  }, [logs]);

  const todaysLogs = useMemo(
    () =>
      logs.filter(
        (item) => item.date === date
      ),
    [logs, date]
  );

  const completedIds = useMemo(
    () =>
      new Set(
        todaysLogs
          .filter(
            (item) =>
              item.routine === tab &&
              !item.skipped
          )
          .map(
            (item) =>
              item.exerciseId
          )
      ),
    [todaysLogs, tab]
  );

  const alreadyLogged =
    todaysLogs.some(
      (item) =>
        item.routine === tab &&
        item.exerciseId === ex?.id &&
        !item.skipped
    );

  function resetExerciseFields() {
    setFeel("Good");
    setAmount("");
    setNote("");
    setPain(false);
    setDetails(false);
    setImageFailed(false);
  }

  function switchTab(nextTab) {
    setTab(nextTab);
    setIdx(0);

    resetExerciseFields();

    setDuplicatePrompt(false);
    setPendingSave(null);
  }

  function changeExercise(nextIndex) {
    setIdx(nextIndex);
    resetExerciseFields();
  }

  function persist(nextLogs) {
    setLogs(nextLogs);

    localStorage.setItem(
      "mobility-logs",
      JSON.stringify(nextLogs)
    );
  }

  function buildEntry({
    skipped = false,
    prescribed = false,
  } = {}) {
    return {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

      ts: new Date().toISOString(),
      date,

      routine: tab,

      exerciseId: ex.id,
      exercise: ex.name,

      dose: `${ex.target} ${ex.unit}`,

      amount: prescribed
        ? String(ex.target)
        : amount,

      prescribed,

      feel,
      note,
      pain,
      skipped,

      tags: ex.tags,

      version: 2,
    };
  }

  function performSave(options = {}) {
    if (saveLocked || !ex) return;

    setSaveLocked(true);

    const entry =
      buildEntry(options);

    const nextLogs = [
      ...logs,
      entry,
    ];

    persist(nextLogs);

    setAmount("");
    setNote("");
    setFeel("Good");
    setPain(false);

    setDuplicatePrompt(false);
    setPendingSave(null);

    setTimeout(() => {
      setSaveLocked(false);
    }, 700);

    if (idx < list.length - 1) {
      setIdx(
        (current) => current + 1
      );
      setImageFailed(false);
    }
  }

  function requestSave(options = {}) {
    if (
      alreadyLogged &&
      !options.skipped
    ) {
      setPendingSave(options);
      setDuplicatePrompt(true);
      return;
    }

    performSave(options);
  }

  function confirmDuplicate() {
    performSave(
      pendingSave || {}
    );
  }

  function cancelDuplicate() {
    setDuplicatePrompt(false);
    setPendingSave(null);
  }

  function undoLast() {
    if (!logs.length) return;

    persist(
      logs.slice(0, -1)
    );
  }

  function deleteLog(id) {
    persist(
      logs.filter(
        (item) =>
          item.id !== id
      )
    );
  }

  async function askCoach(event) {
    event.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setCoachReply("");

    try {
      const response = await fetch(
        "/api/coach",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            question,
            context:
              logs.slice(-60),
            routines,
          }),
        }
      );

      const data =
        await response.json();

      setCoachReply(
        data.answer ||
          data.error ||
          "Coach unavailable."
      );
    } catch {
      setCoachReply(
        "AI Coach is not connected right now."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!ex) {
    return (
      <main className="app">
        <p>
          No exercises found.
        </p>
      </main>
    );
  }

  const hasDiagram =
    Boolean(ex.image) &&
    !imageFailed;

  return (
    <main className="app">
      <header>
        <div>
          <div className="kicker">
            {prettyDate()}
          </div>

          <h1>
            Mobility Coach
          </h1>
        </div>

        <button
          className="coachBtn"
          onClick={() =>
            setCoachOpen(true)
          }
        >
          AI Coach
        </button>
      </header>

      <nav className="tabs">
        {routineNames.map(
          (item) => (
            <button
              key={item}
              onClick={() =>
                switchTab(item)
              }
              className={
                tab === item
                  ? "active"
                  : ""
              }
            >
              {item}
            </button>
          )
        )}
      </nav>

      <section className="compactTop">
        <select
          aria-label="Jump to exercise"
          value={idx}
          onChange={(event) =>
            changeExercise(
              Number(
                event.target.value
              )
            )
          }
        >
          {list.map(
            (item, index) => (
              <option
                key={item.id}
                value={index}
              >
                {completedIds.has(
                  item.id
                )
                  ? "✓ "
                  : ""}

                {index + 1}.{" "}
                {item.name}
              </option>
            )
          )}
        </select>

        <span>
          {idx + 1}/{list.length}
        </span>
      </section>

      <div className="progress">
        <div
          style={{
            width: `${
              ((idx + 1) /
                list.length) *
              100
            }%`,
          }}
        />
      </div>

      <section className="card">
        <div className="topline">
          <strong>
            {ex.name}
          </strong>

          <b>
            {ex.target}{" "}
            {ex.unit}
          </b>
        </div>

        <div className="exerciseImageWrap">
          {hasDiagram ? (
            <img
              src={ex.image}
              alt={`How to perform ${ex.name}`}
              className="exerciseImage"
              onError={() =>
                setImageFailed(true)
              }
            />
          ) : (
            <div className="diagramPlaceholder">
              <div className="diagramIcon">
                ↔
              </div>

              <span>
                Diagram coming soon
              </span>
            </div>
          )}
        </div>

        <div className="breath mini">
          <h3>
            Breathing
          </h3>

          <p>
            {ex.breathing}
          </p>
        </div>

        <div className="quickActions">
          <button
            className="primary doneBtn"
            disabled={saveLocked}
            onClick={() =>
              requestSave({
                prescribed: true,
              })
            }
          >
            ✓ Done as prescribed
          </button>

          <button
            disabled={saveLocked}
            onClick={() =>
              requestSave({
                skipped: true,
              })
            }
          >
            Skip
          </button>
        </div>

        <label>
          How did it feel?
        </label>

        <div className="feel">
          {[
            "Easy",
            "Good",
            "Challenging",
            "Too much",
          ].map(
            (item) => (
              <button
                key={item}
                className={
                  feel === item
                    ? "sel"
                    : ""
                }
                onClick={() =>
                  setFeel(item)
                }
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          className="detailsBtn"
          onClick={() =>
            setDetails(
              !details
            )
          }
        >
          {details
            ? "Hide details"
            : "More details"}
        </button>

        {details && (
          <div className="details">
            <div className="info">
              <h3>
                Instructions
              </h3>

              <p>
                {
                  ex.instructions
                }
              </p>
            </div>

            <div className="tagRow">
              {ex.tags.map(
                (tag) => (
                  <span
                    className="tag"
                    key={tag}
                  >
                    {tag}
                  </span>
                )
              )}

              {ex.core && (
                <span className="tag coreTag">
                  Core
                </span>
              )}
            </div>

            <label>
              Did a different
              amount?
            </label>

            <input
              value={amount}
              onChange={(event) =>
                setAmount(
                  event.target
                    .value
                )
              }
              placeholder={
                ex.type ===
                "timer"
                  ? "seconds completed"
                  : "reps completed"
              }
            />

            <button
              className="manualSave"
              disabled={saveLocked}
              onClick={() =>
                requestSave({
                  prescribed:
                    false,
                })
              }
            >
              Save custom amount
            </button>

            <label className="painRow">
              <input
                type="checkbox"
                checked={pain}
                onChange={(
                  event
                ) =>
                  setPain(
                    event.target
                      .checked
                  )
                }
              />

              <span>
                I felt pain or
                pinching
              </span>
            </label>

            <label>
              Note (optional)
            </label>

            <textarea
              value={note}
              onChange={(event) =>
                setNote(
                  event.target
                    .value
                )
              }
              placeholder="Tighter on left, ankle felt better, etc."
            />
          </div>
        )}

        <div className="actions">
          <button
            disabled={idx === 0}
            onClick={() =>
              changeExercise(
                Math.max(
                  0,
                  idx - 1
                )
              )
            }
          >
            Back
          </button>

          <button
            disabled={
              idx ===
              list.length - 1
            }
            onClick={() =>
              changeExercise(
                Math.min(
                  list.length -
                    1,
                  idx + 1
                )
              )
            }
          >
            Next
          </button>
        </div>
      </section>

      <section className="utilityRow">
        <button
          onClick={undoLast}
          disabled={!logs.length}
        >
          Undo last log
        </button>

        <button
          onClick={() =>
            setHistoryOpen(true)
          }
        >
          History
        </button>
      </section>

      {alreadyLogged && (
        <div className="statusNote">
          ✓ This exercise is
          already logged today.
        </div>
      )}

      {duplicatePrompt && (
        <div className="backdrop">
          <section className="modal small">
            <div className="kicker">
              Duplicate log check
            </div>

            <h2>
              Already logged
            </h2>

            <p>
              You already saved{" "}
              <strong>
                {ex.name}
              </strong>{" "}
              for this routine
              today.
            </p>

            <div className="actions">
              <button
                onClick={
                  cancelDuplicate
                }
              >
                Cancel
              </button>

              <button
                className="primary"
                onClick={
                  confirmDuplicate
                }
              >
                Log another anyway
              </button>
            </div>
          </section>
        </div>
      )}

      {historyOpen && (
        <div
          className="backdrop"
          onClick={() =>
            setHistoryOpen(false)
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
                  Workout history
                </div>

                <h2>
                  Recent logs
                </h2>
              </div>

              <button
                onClick={() =>
                  setHistoryOpen(
                    false
                  )
                }
              >
                ×
              </button>
            </div>

            <div className="historyList">
              {[...logs]
                .reverse()
                .slice(0, 40)
                .map(
                  (item) => (
                    <div
                      className="historyItem"
                      key={
                        item.id
                      }
                    >
                      <div>
                        <strong>
                          {
                            item.exercise
                          }
                        </strong>

                        <span>
                          {
                            item.date
                          }{" "}
                          ·{" "}
                          {
                            item.routine
                          }
                          {item.skipped
                            ? " · skipped"
                            : ""}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          deleteLog(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}

              {!logs.length && (
                <p className="muted">
                  No logs yet.
                </p>
              )}
            </div>
          </section>
        </div>
      )}

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
                  Ask about your
                  routine
                </h2>
              </div>

              <button
                onClick={() =>
                  setCoachOpen(
                    false
                  )
                }
              >
                ×
              </button>
            </div>

            <p className="muted">
              Uses recent logs,
              exercise tags,
              pain flags and
              routine history.
            </p>

            <form
              onSubmit={
                askCoach
              }
            >
              <textarea
                value={question}
                onChange={(
                  event
                ) =>
                  setQuestion(
                    event.target
                      .value
                  )
                }
                placeholder="What should I change based on my recent sessions?"
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
  document.getElementById(
    "root"
  )
).render(<App />);
