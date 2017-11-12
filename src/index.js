module.exports = babel => {
  const t = babel.types;

  return {
    name: "s2s-redux-actions-reducers",
    visitor: {
      ObjectProperty: function(path){
        if(!path.node.shorthand){
          return
        }
        const ObjectExpression = path.find(parent => parent.isObjectExpression())
        const actionName = path.node.value.name

        const reducerObjectProperty = t.ObjectProperty(
          t.MemberExpression(t.identifier("actions"),t.identifier(actionName)),
          t.ArrowFunctionExpression(
            [t.Identifier("state"),t.Identifier("action")],
            t.ObjectExpression(
              [t.SpreadProperty(t.Identifier("state"))]
            )
          ),true
        )

        path.replaceWith(reducerObjectProperty)
      }
    }
  };
}
