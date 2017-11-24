module.exports = babel => {
  const t = babel.types;

  return {
    name: "s2s-redux-actions-reducers",
    visitor: {
      Program: {
  	    enter(path, state){
          const { autocomplete } = state.opts
          path.traverse({
            ObjectProperty(path){
              if(path.node.key.type != "Identifier"){
                return
              }
              if(path.node.shorthand == false){
                return
              }
              const actionName = path.node.key.name
              const ObjectExpression = path.find(parent => parent.isObjectExpression())

              if(autocomplete == false){ return }

              if (actionName.endsWith('Request')) {
                ObjectExpression.node.properties.push(
                  t.ObjectProperty(
                    t.Identifier(actionName.replace(/Request$/, 'Success')),
                    t.Identifier(actionName.replace(/Request$/, 'Success')),
                    false,true
                  ),
                  t.ObjectProperty(
                    t.Identifier(actionName.replace(/Request$/, 'Failure')),
                    t.Identifier(actionName.replace(/Request$/, 'Failure')),
                    false,true
                  )
                )
              }
            }
          })
        }
      },
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
