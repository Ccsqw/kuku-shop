"use client";
import { useState } from "react";
import { addQuestion } from "@/actions/ask";

export default function ProductAskEveryone({
  qaList,
  productId,
}: {
  qaList: any[];
  productId: number;
}) {
  const [newQuestion, setNewQuestion] = useState("");
  console.log("qaList888:", qaList);
  const handleSubmit = async () => {
    await addQuestion({
      productId: productId,
      question: newQuestion,
    });
    setNewQuestion("");
  };
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/40 ring-1 ring-slate-100">
      <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              问大家
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              看看其他买家关心的问题，有疑问也可以向已购用户提问。
            </p>
          </div>

          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
            共{qaList.length}个常见问题
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {qaList.map((item: any, index: number) => (
          <article
            key={item.q_id}
            className="flex gap-5 px-8 py-6 hover:bg-slate-50/60 transition-colors"
          >
            <div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white shadow-sm shadow-sky-600/25">
                Q{index + 1}
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <h3 className="font-semibold text-slate-900">{item.question}</h3>
              {item.answer.map((answer: any) => (
                <div
                  key={answer.a_id}
                  className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2"
                >
                  <p className="text-sm leading-relaxed text-slate-600">
                    {answer.content}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {answer.helpful}人觉得有帮助
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-6 sm:px-8">
        <label
          htmlFor="product-ask-new-question"
          className="block text-sm font-semibold text-slate-800"
        >
          我要提问
        </label>
        <p className="mt-1 text-xs text-slate-500">
          描述尽量具体，方便买过的人回答你（可先写静态文案，后续再接提交逻辑）。
        </p>
        <textarea
          id="product-ask-new-question"
          name="question"
          rows={4}
          placeholder="例如：这款颜色实拍偏深还是偏浅？和官网图差别大吗？"
          className="mt-4 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-inner shadow-slate-100/80 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            还可输入约 200 字（静态占位）
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-600/25 transition hover:bg-sky-700 active:scale-[0.98]"
            onClick={handleSubmit}
          >
            提交问题
          </button>
        </div>
      </div>
    </section>
  );
}
