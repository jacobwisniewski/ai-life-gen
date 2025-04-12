"use client";
import { useState, useEffect } from "react";

const MIN_GOALS_REQUIRED = 3;
const MAX_TOP_GOALS = 2;

type Goal = { id: string; value: string };

const IntroStep = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Buffett's Two Lists
      </h2>
      <p className="text-gray-700 mb-4">
        This method comes from a conversation between Warren Buffett and his
        pilot, Steve. Buffett asked Steve to list the top 25 things he wanted to
        achieve in life. Then he told Steve to circle his top 5.
      </p>
      <p className="text-gray-700 mb-4">
        When Steve said he would work on the top 5 and occasionally the others,
        Buffett corrected him:{" "}
        <em>
          “Everything you didn’t circle just became your ‘avoid at all costs’
          list.”
        </em>
      </p>
      <p className="text-gray-700 mb-4">
        This exercise helps you focus on what truly matters—and eliminate
        distractions, even good ones. Let’s try it.
      </p>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition-colors"
        >
          Get Started
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Back
        </button>
      </div>
    </div>
  );
};

const NameStep = ({
  name,
  setName,
  onNext,
}: {
  name: string;
  setName: (name: string) => void;
  onNext: () => void;
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      if (name.trim()) onNext();
    }}
  >
    <h2 className="text-2xl font-bold mb-4 text-center">
      What&#39;s your name?
    </h2>
    <p className="text-center mb-6 text-gray-700">
      Tell us your name so we can help you connect more deeply with your goals.
    </p>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
      className="w-full p-3 border rounded mb-6"
    />
    <div className="flex justify-center">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50 transition-colors"
        disabled={!name.trim()}
      >
        Continue
      </button>
      <button
        type="button"
        onClick={onNext}
        className="ml-4 text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Skip
      </button>
    </div>
  </form>
);

const GoalsStep = ({
  name,
  goals,
  updateGoal,
  removeGoal,
  onBack,
  onNext,
}: {
  name: string;
  goals: Goal[];
  updateGoal: (index: number, value: string) => void;
  removeGoal: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
}) => {
  const examples = [
    "Achieve Financial Independence",
    "Travel the World",
    "Start a Business",
    "Write a Book",
    "Pursue Higher Education",
    "Invest in Real Estate",
    "Develop a New Skill",
    "Mentor Others",
    "Create a Legacy Project",
    "Give Back to the Community",
  ];

  const filledGoals = goals.filter((g) => g.value.trim() !== "");
  const filledCount = filledGoals.length;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (filledCount >= MIN_GOALS_REQUIRED) onNext();
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {name
          ? `${name}, what do you want to achieve in life?`
          : "What do you want to achieve in life?"}
      </h2>
      <p className="text-center mb-6 text-gray-700">
        List up to 20 goals that you want to achieve in your life and career.
        Use the examples as inspiration. You need at least {MIN_GOALS_REQUIRED}{" "}
        to continue.
      </p>
      <div className="flex flex-col gap-3">
        {goals.map((goal, index) => (
          <div key={goal.id} className="relative">
            <input
              type="text"
              value={goal.value}
              placeholder={
                index < examples.length
                  ? `e.g. ${examples[index]}`
                  : "Enter your goal"
              }
              onChange={(e) => updateGoal(index, e.target.value)}
              className="p-3 pr-10 border rounded w-full focus:outline-none"
            />
            <button
              type="button"
              onClick={() => removeGoal(index)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
              aria-label="Remove goal"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50 transition-colors"
          disabled={filledCount < MIN_GOALS_REQUIRED}
        >
          Next
        </button>
      </div>
      {filledCount < MIN_GOALS_REQUIRED && (
        <p className="mt-4 text-center text-sm text-red-500">
          Add {MIN_GOALS_REQUIRED - filledCount} more{" "}
          {MIN_GOALS_REQUIRED - filledCount === 1 ? "goal" : "goals"} to
          continue
        </p>
      )}
      <div className="mt-4 w-full h-3 bg-green-200 rounded-full relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-red-100"
          style={{ width: `${(MIN_GOALS_REQUIRED / 20) * 100}%` }}
        />
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-300 ${filledCount >= MIN_GOALS_REQUIRED ? "bg-green-300" : "bg-red-200"}`}
          style={{ width: `${Math.min((filledCount / 20) * 100, 100)}%` }}
        />
      </div>
    </form>
  );
};

const TopGoalsStep = ({
  name,
  goals,
  top5,
  toggleTop5,
  onBack,
  onFinish,
}: {
  name: string;
  goals: Goal[];
  top5: string[];
  toggleTop5: (id: string) => void;
  onBack: () => void;
  onFinish: () => void;
}) => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-center">
      {name
        ? `Alright ${name}, now pick your top ${MAX_TOP_GOALS}`
        : `Now pick your top ${MAX_TOP_GOALS} goals`}
    </h2>
    <p className="text-center mb-6 text-gray-700">
      Select the top {MAX_TOP_GOALS} goals that are most important to you.
      Everything else will be considered a distraction.
    </p>
    <div className="flex flex-col gap-3">
      {goals.map((goal) => (
        <button
          key={goal.id}
          onClick={() => toggleTop5(goal.id)}
          className={`p-3 border rounded w-full text-left transition-colors ${top5.includes(goal.id) ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300 hover:bg-gray-50"}`}
        >
          {goal.value}
        </button>
      ))}
    </div>
    <div className="mt-6 flex justify-between">
      <button
        onClick={onBack}
        className="text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Back
      </button>
      <button
        onClick={onFinish}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded disabled:opacity-50 transition-colors"
        disabled={top5.length !== MAX_TOP_GOALS}
      >
        Finish
      </button>
    </div>
  </>
);

const SummaryStep = ({
  name,
  goals,
  top5,
  onBack,
}: {
  name: string;
  goals: Goal[];
  top5: string[];
  onBack: () => void;
}) => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-center">
      {name ? `Great work, ${name}!` : "Great work!"}
    </h2>
    <p className="text-center mb-6 text-gray-700">
      Here's what you should focus on—and what you should avoid.
    </p>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
              Top {MAX_TOP_GOALS} Priorities
            </th>
            <th className="border-b border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
              Things to Avoid
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({
            length: Math.max(top5.length, goals.length - top5.length),
          }).map((_, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 border-b border-gray-200">
                {top5[i] ? goals.find((g) => g.id === top5[i])?.value : ""}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">
                {goals.filter((g) => !top5.includes(g.id))[i]?.value || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-bold text-blue-900 mb-3">
        Actionable Takeaways
      </h3>
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
        <li>
          <strong>Make a list of your top 25 priorities.</strong>
          <br />
          You might apply this to a specific project or timeframe, or consider
          your broader life goals.
        </li>
        <li>
          <strong>Circle your highest 5 priorities.</strong>
          <br />
          These are the things that must be accomplished and drive you.
        </li>
        <li>
          <strong>
            Focus on your top 5 and avoid the other 20 at all costs.
          </strong>
          <br />
          This isn’t just about what you do, it’s about how you say no to those
          tempting secondary priorities to achieve real focus.
        </li>
        <li>
          <strong>
            When you achieve 1 of your top 5, add a new goal from the 20.
          </strong>
          <br />
          This list is a work in progress—something on the ‘avoid at all cost’
          list might become a priority as you achieve your top 5.
        </li>
      </ul>
    </div>
    <div className="mt-6 flex justify-center">
      <button
        onClick={onBack}
        className="text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Back
      </button>
    </div>
  </>
);

export default function Onboarding() {
  const [formData, setFormData] = useState<{
    name: string;
    goals: Goal[];
    top5: string[];
  }>({
    name: "",
    goals: [{ id: crypto.randomUUID(), value: "" }],
    top5: [],
  });
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem("onboardingFormData");
    const savedStep = localStorage.getItem("onboardingStep");
    if (savedData && savedStep) {
      try {
        setFormData(JSON.parse(savedData));
        setStep(parseInt(savedStep) as 0 | 1 | 2 | 3 | 4);
      } catch (err) {
        console.error("Failed to load saved onboarding data", err);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("onboardingFormData", JSON.stringify(formData));
    localStorage.setItem("onboardingStep", step.toString());
  }, [formData, step]);

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index].value = value.trimStart();

    if (value.trim() === "" && index !== newGoals.length - 1) {
      newGoals.splice(index, 1);
      setFormData({ ...formData, goals: newGoals });
      return;
    }

    setFormData({ ...formData, goals: newGoals });

    if (
      index === newGoals.length - 1 &&
      value.trim() !== "" &&
      newGoals.length < 20
    ) {
      newGoals.push({ id: crypto.randomUUID(), value: "" });
      setFormData({ ...formData, goals: newGoals });
    }
  };

  const removeGoal = (index: number) => {
    const filtered = formData.goals.filter((_, i) => i !== index);
    setFormData({ ...formData, goals: filtered });
  };

  const filledGoals = formData.goals.filter((g) => g.value.trim() !== "");
  const filledCount = filledGoals.length;

  const toggleTop5 = (id: string) => {
    if (formData.top5.includes(id)) {
      setFormData({ ...formData, top5: formData.top5.filter((g) => g !== id) });
    } else if (formData.top5.length < MAX_TOP_GOALS) {
      setFormData({ ...formData, top5: [...formData.top5, id] });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow mt-8">
        {(() => {
          switch (step) {
            case 0:
              return (
                <NameStep
                  name={formData.name}
                  setName={(name) => setFormData({ ...formData, name })}
                  onNext={() => setStep(1)}
                />
              );
            case 1:
              return (
                <IntroStep
                  onNext={() => setStep(2)}
                  onBack={() => setStep(0)}
                />
              );
            case 2:
              return (
                <GoalsStep
                  name={formData.name}
                  goals={formData.goals}
                  updateGoal={updateGoal}
                  removeGoal={removeGoal}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                />
              );
            case 3:
              return (
                <TopGoalsStep
                  name={formData.name}
                  goals={filledGoals}
                  top5={formData.top5}
                  toggleTop5={toggleTop5}
                  onBack={() => setStep(2)}
                  onFinish={() => setStep(4)}
                />
              );
            case 4:
              return (
                <SummaryStep
                  name={formData.name}
                  goals={filledGoals}
                  top5={formData.top5}
                  onBack={() => setStep(3)}
                />
              );
          }
        })()}
      </div>
    </div>
  );
}
