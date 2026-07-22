"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const blankBudget = {
  monthly_income: 0, housing: 0, utilities: 0, food: 0,
  transport: 0, debt: 0, giving: 0, savings: 0, other: 0
};

export default function Dashboard() {
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [budget, setBudget] = useState<any>(blankBudget);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [tab, setTab] = useState("Today");

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) { window.location.href = "/"; return; }

    setUserId(data.user.id);

    const [profileResult, budgetResult, expenseResult] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", data.user.id).single(),
      supabase.from("budgets").select("*").eq("user_id", data.user.id).maybeSingle(),
      supabase.from("expenses").select("*").eq("user_id", data.user.id).order("spent_on", { ascending: false })
    ]);

    setProfile(profileResult.data);
    if (budgetResult.data) setBudget(budgetResult.data);
    setExpenses(expenseResult.data || []);
  }

  const commitments = ["housing","utilities","food","transport","debt","giving","savings","other"]
    .reduce((total, key) => total + Number(budget[key] || 0), 0);

  const available = Number(budget.monthly_income || 0) - commitments;
  const weekly = available / 4.33;
  const money = (value: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value || 0);

  async function saveBudget(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data } = await supabase
      .from("budgets")
      .upsert({ ...budget, user_id: userId }, { onConflict: "user_id" })
      .select()
      .single();

    if (data) setBudget(data);
  }

  async function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const { data } = await supabase.from("expenses").insert({
      user_id: userId,
      description: String(form.get("description")),
      amount: Number(form.get("amount")),
      category: String(form.get("category")),
      spent_on: String(form.get("spent_on"))
    }).select().single();

    if (data) setExpenses([data, ...expenses]);
    event.currentTarget.reset();
  }

  if (!profile) return <main className="loading">Loading Kingdom Steward…</main>;

  return (
    <div className="shell">
      <aside>
        <h2>Kingdom Steward</h2>
        {["Today", "Money Plan", "Expenses"].map(name => (
          <button key={name} className={tab === name ? "active" : ""} onClick={() => setTab(name)}>{name}</button>
        ))}
        <button onClick={async () => { await supabase.auth.signOut(); window.location.href = "/"; }}>Sign Out</button>
      </aside>

      <main className="content">
        {tab === "Today" && <>
          <section className="hero">
            <p className="eyebrow">TODAY</p>
            <h1>Good day, {profile.full_name || "Steward"}</h1>
            <p>You have {money(available)} available after planned commitments.</p>
          </section>

          <section className="stats">
            <article><span>Income</span><strong>{money(budget.monthly_income)}</strong></article>
            <article><span>Commitments</span><strong>{money(commitments)}</strong></article>
            <article><span>Available</span><strong>{money(available)}</strong></article>
            <article><span>Weekly Amount</span><strong>{money(weekly)}</strong></article>
          </section>
        </>}

        {tab === "Money Plan" && <>
          <h1>Monthly Money Plan</h1>
          <form className="panel grid" onSubmit={saveBudget}>
            {Object.entries({
              monthly_income: "Monthly Income", housing: "Housing", utilities: "Utilities",
              food: "Food", transport: "Transport", debt: "Debt Payments",
              giving: "Giving", savings: "Savings", other: "Other"
            }).map(([key, label]) => (
              <label key={key}>{label}
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={budget[key] || 0}
                  onChange={event => setBudget({ ...budget, [key]: Number(event.target.value) })}
                />
              </label>
            ))}
            <button className="primary full">Save Money Plan</button>
          </form>
        </>}

        {tab === "Expenses" && <>
          <h1>Expense Tracker</h1>
          <form className="panel grid" onSubmit={addExpense}>
            <label>Description<input name="description" required /></label>
            <label>Amount<input name="amount" type="number" step="0.01" min="0.01" required /></label>
            <label>Category
              <select name="category">
                <option>Food</option><option>Transport</option><option>Giving</option>
                <option>Personal</option><option>Other</option>
              </select>
            </label>
            <label>Date<input name="spent_on" type="date" required /></label>
            <button className="primary full">Add Expense</button>
          </form>

          <section className="panel">
            {expenses.length === 0 && <p>No expenses recorded yet.</p>}
            {expenses.map(item => (
              <div className="row" key={item.id}>
                <div><strong>{item.description}</strong><small>{item.category} • {item.spent_on}</small></div>
                <strong>{money(Number(item.amount))}</strong>
              </div>
            ))}
          </section>
        </>}
      </main>
    </div>
  );
}
