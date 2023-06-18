import o from "react";
const g = (e, t) => {
  switch (t.type) {
    case "FieldChange":
      return { ...e, fields: t.fields };
    case "FormSubmit":
      const { fields: i, isValid: r } = t;
      return { ...e, fields: i, isValid: r, isSubmitting: !1 };
    case "IsSubmitting":
      return {
        ...e,
        showError: !0,
        isSubmitting: t.isSubmitting ? t.isSubmitting : !e.isSubmitting
      };
    default:
      throw new Error("Unexpected action");
  }
};
function c(e) {
  return !!e;
}
function h(e) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
}
function b(e, t) {
  return e.length >= t.min;
}
function p(e) {
  return /^[A-Za-z ]+$/.test(e);
}
function F(e) {
  return !!/^[a-zA-Z0-9_][a-zA-Z]+[0-9]+$/.test(e);
}
function w(e) {
  return !!new RegExp("^[0-9]+$").test(e);
}
function S(e) {
  try {
    return new URL(e), !0;
  } catch {
    return !1;
  }
}
const d = (e, t) => {
  if ("validateFunction" in t)
    return t.validateFunction[t.type](e, t);
  const i = {
    required: c,
    email: h,
    minLength: b,
    url: S,
    numbers: w,
    letters: p,
    username: F
  };
  if (i[t.type])
    return i[t.type](e, t == null ? void 0 : t.data);
}, v = (e) => {
  let t = {}, i = !0;
  return e.constraints.map((r) => {
    d(e.value, r) && i ? t = {
      ...e,
      //value: value,
      isValid: !0,
      errorMessage: ""
    } : i && (i = !1, t = {
      ...e,
      //value: value,
      isValid: !1,
      errorMessage: r.message
    });
  }), e.constraints.length <= 0 && (t = {
    //value: value,
    ...e
  }), t;
}, V = (e) => {
  let t = {}, i = [];
  return Object.keys(e).map((r) => {
    let s = !0;
    e[r].constraints.map((a) => {
      d(e[r].value, a) && s ? (i.push(!0), t[r] = {
        ...e[r],
        isValid: !0,
        errorMessage: ""
      }) : s && (i.push(!1), t[r] = {
        ...e[r],
        isValid: !1,
        errorMessage: a.message
      }, s = !1);
    }), e[r].constraints.length <= 0 && (t[r] = {
      ...e[r]
    });
  }), {
    isValid: !i.includes(!1),
    fields: t
  };
}, x = ({
  formFields: e,
  afterSubmit: t,
  immediateError: i = !1
}) => {
  const [r, s] = o.useReducer(g, {
    fields: { ...e },
    isValid: !0,
    isSubmitting: !1,
    showError: i
  });
  return {
    handleChange: (u) => {
      const { name: l, value: n } = u.target;
      if (r.fields[l].value = n, r.showError) {
        let f = v(r.fields[l]);
        s({
          type: "FieldChange",
          fields: { ...r.fields, [l]: f }
        });
      } else
        s({
          type: "FieldChange",
          fields: { ...r.fields, [l]: r.fields[l] }
        });
    },
    handleSubmit: (u) => {
      u.preventDefault(), s({
        type: "IsSubmitting",
        isSubmitting: !0
      });
      const { isValid: l, fields: n } = V(r.fields);
      s({
        type: "FormSubmit",
        fields: n,
        isValid: l
      }), t(l);
    },
    fields: r.fields,
    isValidForm: r.isValid,
    isSubmitting: r.isSubmitting
  };
};
export {
  x as default
};
