"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  tag: "",
  name: "",
  tel: "",
  address: "",
  isDefault: false,
};
interface PropType {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}
export default function AddressModel({ open, onClose, onSave }: PropType) {
  const [form, setForm] = useState(emptyForm);
  const handleSubmit = async () => {
    console.log("form", form);
    const response = await fetch("/api/address/add", {
      method: "post",
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.success) {
      onSave();
    } else {
      alert(data.message);
    }
    onClose();
  };
  //组件挂载时，重置表单数据
  //每次打开弹窗里面没数据
  useEffect(() => {
    if (open) {
      setForm({ ...emptyForm });
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-6 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">新增收货地址</h2>
              <p className="mt-1 text-sm text-slate-500">
                默认地址仅能设置为一个
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              onClick={() => onClose()}
            >
              ❌
            </button>
          </div>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              地址标签
            </label>
            <input
              type="text"
              value={form.tag}
              onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
              placeholder="如：家、公司"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="min-w-0 sm:flex-1">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                收货人<span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="姓名"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <div className="min-w-0 sm:flex-1">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                手机号
              </label>
              <input
                type="text"
                value={form.tel}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tel: e.target.value }))
                }
                placeholder="11位手机号"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              详细地址<span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              placeholder="省市区、街道、门牌号等"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                setForm((f) => ({ ...f, isDefault: e.target.checked }))
              }
              className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            设为默认收获地址
          </label>
          <div className="flex gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => onClose()}
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              保存地址
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
