/* @ds-bundle: {"format":4,"namespace":"NakedNativeDesignSystem_4d778f","components":[{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Badge","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/commerce/ProductCard.jsx":"0292a96fa6e7","components/core/Button.jsx":"22fbb0618142","components/core/Card.jsx":"5ce487f6371e","components/core/Tag.jsx":"2b11ce860933","components/forms/Input.jsx":"80b11dceef08"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NakedNativeDesignSystem_4d778f = window.NakedNativeDesignSystem_4d778f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/ProductCard.jsx
try { (() => {
function ProductCard({
  image,
  name,
  price,
  colorway,
  onAdd
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('div', {
    style: {
      fontFamily: 'var(--font-body)',
      cursor: 'pointer'
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, React.createElement('div', {
    style: {
      position: 'relative',
      aspectRatio: '3/4',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-sunken)'
    }
  }, React.createElement('img', {
    src: image,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(1.04)' : 'scale(1)',
      transition: 'transform var(--duration-base) var(--ease-standard)'
    }
  })), React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px'
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)'
    }
  }, name), colorway ? React.createElement('div', {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: '2px'
    }
  }, colorway) : null), React.createElement('div', {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)'
    }
  }, price)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick
}) {
  const base = {
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: '.04em',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? .5 : 1,
    transition: 'background var(--duration-base) var(--ease-standard),color var(--duration-base) var(--ease-standard)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  };
  const sizes = {
    sm: {
      fontSize: 'var(--text-xs)',
      padding: '8px 16px'
    },
    md: {
      fontSize: 'var(--text-sm)',
      padding: '12px 24px'
    },
    lg: {
      fontSize: 'var(--text-sm)',
      padding: '16px 32px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--nn-navy-900)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--nn-navy-900)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--nn-navy-900)',
      borderColor: 'var(--nn-navy-900)'
    },
    accent: {
      background: 'var(--accent-primary)',
      color: 'var(--nn-navy-900)',
      borderColor: 'var(--accent-primary)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'transparent'
    }
  };
  const hover = {
    primary: {
      background: 'var(--nn-navy-700)'
    },
    secondary: {
      background: 'var(--nn-navy-900)',
      color: 'var(--text-inverse)'
    },
    accent: {
      background: 'var(--accent-primary-hover)'
    },
    ghost: {
      background: 'var(--surface-sunken)'
    }
  };
  const [isHover, setHover] = React.useState(false);
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant],
    ...(isHover && !disabled ? hover[variant] : {})
  };
  return React.createElement('button', {
    style,
    disabled,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  image,
  eyebrow,
  title,
  children,
  padded = true
}) {
  const style = {
    background: 'var(--surface-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    fontFamily: 'var(--font-body)'
  };
  return React.createElement('div', {
    style
  }, image ? React.createElement('img', {
    src: image,
    style: {
      width: '100%',
      aspectRatio: '4/3',
      objectFit: 'cover',
      display: 'block'
    }
  }) : null, React.createElement('div', {
    style: {
      padding: padded ? '20px' : '0'
    }
  }, eyebrow ? React.createElement('div', {
    style: {
      fontSize: 'var(--text-xs)',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginBottom: '6px'
    }
  }, eyebrow) : null, title ? React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-primary)',
      marginBottom: '8px'
    }
  }, title) : null, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  tone = 'neutral'
}) {
  const tones = {
    neutral: {
      background: 'var(--surface-sunken)',
      color: 'var(--text-secondary)'
    },
    tan: {
      background: 'var(--nn-tan-500)',
      color: 'var(--nn-navy-900)'
    },
    moss: {
      background: 'var(--nn-moss-500)',
      color: 'var(--nn-sand-50)'
    },
    navy: {
      background: 'var(--nn-navy-900)',
      color: 'var(--nn-sand-50)'
    }
  };
  const style = {
    ...tones[tone],
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: '.04em',
    textTransform: 'uppercase'
  };
  return React.createElement('span', {
    style
  }, children);
}
function Badge({
  count
}) {
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '18px',
    height: '18px',
    padding: '0 5px',
    borderRadius: 'var(--radius-pill)',
    background: 'var(--nn-error)',
    color: 'var(--nn-sand-50)',
    fontSize: '11px',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)'
  };
  return React.createElement('span', {
    style
  }, count);
}
Object.assign(__ds_scope, { Tag, Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  type = 'text',
  disabled = false
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)',
      opacity: disabled ? .5 : 1
    }
  }, label ? React.createElement('span', {
    style: {
      fontSize: 'var(--text-xs)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, label) : null, React.createElement('input', {
    type,
    placeholder,
    disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      padding: '12px 14px',
      border: `1px solid ${focus ? 'var(--focus-ring)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-sm)',
      outline: 'none',
      background: 'var(--surface-card)',
      color: 'var(--text-primary)',
      transition: 'border-color var(--duration-fast) var(--ease-standard)'
    }
  }));
}
function Checkbox({
  label,
  checked,
  onChange
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, React.createElement('input', {
    type: 'checkbox',
    checked,
    onChange,
    style: {
      width: '18px',
      height: '18px',
      accentColor: 'var(--nn-navy-900)'
    }
  }), label);
}
function Select({
  label,
  options = [],
  value,
  onChange
}) {
  return React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label ? React.createElement('span', {
    style: {
      fontSize: 'var(--text-xs)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, label) : null, React.createElement('select', {
    value,
    onChange,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      padding: '12px 14px',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-card)',
      color: 'var(--text-primary)'
    }
  }, options.map(o => React.createElement('option', {
    key: o,
    value: o
  }, o))));
}
Object.assign(__ds_scope, { Input, Checkbox, Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Select = __ds_scope.Select;

})();
