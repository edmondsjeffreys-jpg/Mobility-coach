import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { routines, routineNames } from "./exercises";
import { ExerciseDiagram } from "./diagrams";
import "./styles.css";

/* =========================================================
   DATE HELPERS
   ========================================================= */

function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateFromKey(key) {
  const [year, month, day] = key
    .split("-")
    .map(Number);

  return new Date(
    year,
    month - 1,
    day,
    12,
    0,
    0
  );
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function prettyDate() {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());
}

function startOfWeek(date = new Date()) {
  const result = new Date(date);

  const day = result.getDay();

  const difference =
    day === 0 ? -6 : 1 - day;

  result.setDate(
    result.getDate() + difference
  );

  result.setHours(12, 0, 0, 0);

  return result;
}

/* =========================================================
   LOG MIGRATION
   ========================================================= */

function normalizeLogs() {
  try {
    const raw = JSON.parse(
      localStorage.getItem(
        "mobility-logs"
      ) || "[]"
    );

    if (!Array.isArray(raw)) {
      return [];
    }

    return raw.map(
      (item, index) => {
        const timestamp =
          item.ts ||
          new Date().toISOString();

        let safeDate =
          item.date;

        if (!safeDate) {
          safeDate = dateKey(
            new Date(timestamp)
          );
        }

        return {
          ...item,

          id:
            item.id ||
            `legacy-${timestamp}-${index}`,

          date: safeDate,
        };
      }
    );
  } catch {
    return [];
  }
}

/* =========================================================
   STREAK HELPERS
   ========================================================= */

function getActiveDates(logs) {
  return new Set(
    logs
      .filter(
        (log) => !log.skipped
      )
      .map((log) => log.date)
      .filter(Boolean)
  );
}

function calculateStreak(activeDates) {
  const today = new Date();

  /*
    Like Duolingo:
    if today isn't completed yet,
    yesterday's streak still shows.
  */

  let cursor = today;

  if (
    !activeDates.has(
      dateKey(today)
    )
  ) {
    cursor = addDays(today, -1);
  }

  let streak = 0;

  for (let i = 0; i < 10000; i++) {
    const key = dateKey(cursor);

    if (!activeDates.has(key)) {
      break;
    }

    streak += 1;
    cursor = addDays(
      cursor,
      -1
    );
  }

  return streak;
}

function calculate30DayConsistency(
  activeDates
) {
  const today = new Date();

  let completed = 0;

  for (let i = 0; i < 30; i++) {
    const date = addDays(
      today,
      -i
    );

    if (
      activeDates.has(
        dateKey(date)
      )
    ) {
      completed += 1;
    }
  }

  return {
    completed,
    percentage: Math.round(
      (completed / 30) * 100
    ),
  };
}

/* =========================================================
   APP
   ========================================================= */

function App() {
  const [tab, setTab] =
    useState("Night");

  const [idx, setIdx] =
    useState(0);

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

  const [
    coachOpen,
    setCoachOpen,
  ] = useState(false);

  const [
    historyOpen,
    setHistoryOpen,
  ] = useState(false);

  const [
    question,
    setQuestion,
  ] = useState("");

  const [
    coachReply,
    setCoachReply,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [
    duplicatePrompt,
    setDuplicatePrompt,
  ] = useState(false);

  const [
    pendingSave,
    setPendingSave,
  ] = useState(null);

  const [
    saveLocked,
    setSaveLocked,
  ] = useState(false);

  const list =
    routines[tab] || [];

  const ex = list[idx];

  const today = dateKey();

  /* =======================================================
     SAVE LOGS
     ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "mobility-logs",
      JSON.stringify(logs)
    );
  }, [logs]);

  /* =======================================================
     HABIT / STREAK DATA
     ======================================================= */

  const activeDates = useMemo(
    () => getActiveDates(logs),
    [logs]
  );

  const streak = useMemo(
    () =>
      calculateStreak(
        activeDates
      ),
    [activeDates]
  );

  const consistency30 =
    useMemo(
      () =>
        calculate30DayConsistency(
          activeDates
        ),
      [activeDates]
    );

  const weekDays = useMemo(
    () => {
      const start =
        startOfWeek();

      return Array.from(
        { length: 7 },
        (_, index) => {
          const date =
            addDays(
              start,
              index
            );

          const key =
            dateKey(date);

          return {
            key,

            label:
              [
                "M",
                "T",
                "W",
                "T",
                "F",
                "S",
                "S",
              ][index],

            dayNumber:
              date.getDate(),

            complete:
              activeDates.has(
                key
              ),

            today:
              key === today,
          };
        }
      );
    },
    [activeDates, today]
  );

  const weeklyCount =
    weekDays.filter(
      (day) => day.complete
    ).length;

  /* =======================================================
     EXERCISE COMPLETION DATA
     ======================================================= */

  const todaysLogs =
    useMemo(
      () =>
        logs.filter(
          (item) =>
            item.date === today
        ),
      [logs, today]
    );

  const completedIds =
    useMemo(
      () =>
        new Set(
          todaysLogs
            .filter(
              (item) =>
                item.routine ===
                  tab &&
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
        item.exerciseId ===
          ex?.id &&
        !item.skipped
    );

  /* =======================================================
     NAVIGATION
     ======================================================= */

  function resetExerciseFields() {
    setFeel("Good");
    setAmount("");
    setNote("");
    setPain(false);
    setDetails(false);
  }

  function switchTab(nextTab) {
    setTab(nextTab);
    setIdx(0);

    resetExerciseFields();

    setDuplicatePrompt(false);
    setPendingSave(null);
  }

  function changeExercise(
    nextIndex
  ) {
    setIdx(nextIndex);

    resetExerciseFields();
  }

  /* =======================================================
     LOGGING
     ======================================================= */

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

      date: today,

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

      version: 3,
    };
  }

  function performSave(
    options = {}
  ) {
    if (
      saveLocked ||
      !ex
    ) {
      return;
    }

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

    if (
      idx <
      list.length - 1
    ) {
      setIdx(
        (current) =>
          current + 1
      );
    }
  }

  function requestSave(
    options = {}
  ) {
    if (
      alreadyLogged &&
      !options.skipped
    ) {
      setPendingSave(
        options
      );

      setDuplicatePrompt(
        true
      );

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
    if (!logs.length) {
      return;
    }

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

  /* =======================================================
     AI COACH
     ======================================================= */

  async function askCoach(
    event
  ) {
    event.preventDefault();

    if (
      !question.trim()
    ) {
      return;
    }

    setLoading(true);
    setCoachReply("");

    try {
      const response =
        await fetch(
          "/api/coach",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                question,

                context:
                  logs.slice(
                    -60
                  ),

                routines,

                habitStats: {
                  streak,

                  consistency30:
                    consistency30.percentage,

                  activeDays30:
                    consistency30.completed,
                },
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

  return (
    <main className="app">
      {/* HEADER */}

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

      {/* HABIT TRACKER */}

      <section
        style={{
          background:
            "var(--card)",
          border:
            "1px solid var(--border)",
          borderRadius: 12,
          padding: "7px 9px",
          margin: "6px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color:
                "var(--accent)",
            }}
          >
            🔥 {streak} day
            {streak === 1
              ? ""
              : "s"}{" "}
            streak
          </div>

          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color:
                "var(--muted)",
            }}
          >
            30-day{" "}
            {
              consistency30.percentage
            }
            %
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(7, 1fr)",
            gap: 4,
          }}
        >
          {weekDays.map(
            (day) => (
              <div
                key={day.key}
                style={{
                  textAlign:
                    "center",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color:
                      "var(--muted)",
                    marginBottom: 2,
                  }}
                >
                  {day.label}
                </div>

                <div
                  style={{
                    width: 25,
                    height: 25,
                    margin:
                      "0 auto",
                    display:
                      "grid",
                    placeItems:
                      "center",
                    borderRadius:
                      "50%",

                    border:
                      day.today
                        ? "2px solid var(--accent)"
                        : "1px solid var(--border)",

                    background:
                      day.complete
                        ? "var(--accent)"
                        : "var(--panel)",

                    color:
                      day.complete
                        ? "#fff"
                        : "var(--muted)",

                    fontSize: 10,
                    fontWeight: 900,
                  }}
                >
                  {day.complete
                    ? "✓"
                    : day.dayNumber}
                </div>
              </div>
            )
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 4,
            fontSize: 9,
            fontWeight: 700,
            color:
              "var(--muted)",
          }}
        >
          This week{" "}
          {weeklyCount}/7 ·{" "}
          {consistency30.completed}
          /30 active days
        </div>
      </section>

      {/* ROUTINE TABS */}

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

      {/* EXERCISE PICKER */}

      <section className="compactTop">
        <select
          aria-label="Jump to exercise"
          value={idx}
          onChange={(event) =>
            changeExercise(
              Number(
                event.target
                  .value
              )
            )
          }
        >
          {list.map(
            (
              item,
              index
            ) => (
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
          {idx + 1}/
          {list.length}
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

      {/* ACTIVE EXERCISE */}

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

        {/* SVG DIAGRAM */}

        <div
          className="exerciseImageWrap"
          style={{
            height: 105,
            overflow: "hidden",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "center",
            color:
              "var(--accent)",
            background:
              "var(--panel)",
            border:
              "1px solid var(--border)",
            borderRadius: 11,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 300,
              height: "100%",
            }}
          >
            <ExerciseDiagram
              image={ex.image}
              name={ex.name}
            />
          </div>
        </div>

        {/* BREATHING */}

        <div className="breath mini">
          <h3>
            Breathing
          </h3>

          <p>
            {ex.breathing}
          </p>
        </div>

        {/* QUICK ACTIONS */}

        <div className="quickActions">
          <button
            className="primary doneBtn"
            disabled={
              saveLocked
            }
            onClick={() =>
              requestSave({
                prescribed:
                  true,
              })
            }
          >
            ✓ Done as prescribed
          </button>

          <button
            disabled={
              saveLocked
            }
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

        {/* DETAILS */}

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
              disabled={
                saveLocked
              }
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

        {/* BACK / NEXT */}

        <div className="actions">
          <button
            disabled={
              idx === 0
            }
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

      {/* UTILITIES */}

      <section className="utilityRow">
        <button
          onClick={undoLast}
          disabled={
            !logs.length
          }
        >
          Undo last log
        </button>

        <button
          onClick={() =>
            setHistoryOpen(
              true
            )
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

      {/* DUPLICATE WARNING */}

      {duplicatePrompt && (
        <div className="backdrop">
          <section className="modal small">
            <div className="kicker">
              Duplicate log
              check
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
                Log another
                anyway
              </button>
            </div>
          </section>
        </div>
      )}

      {/* HISTORY */}

      {historyOpen && (
        <div
          className="backdrop"
          onClick={() =>
            setHistoryOpen(
              false
            )
          }
        >
          <section
            className="modal"
            onClick={(
              event
            ) =>
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

      {/* AI COACH */}

      {coachOpen && (
        <div
          className="backdrop"
          onClick={() =>
            setCoachOpen(false)
          }
        >
          <section
            className="modal"
            onClick={(
              event
            ) =>
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
              exercise history and
              your consistency data.
            </p>

            <form
              onSubmit={
                askCoach
              }
            >
              <textarea
                value={
                  question
                }
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
                disabled={
                  loading
                }
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
