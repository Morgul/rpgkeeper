module App

    open Fable.Core
    open Fable.Import
    open Elmish
    open Fable.React.Props
    open Elmish.React
    open Fable.React

    type Model = { count : int}

    let init () =
        { count = 0 }

    type Msg =
        | Increment
        | Decrement

    let update (msg:Msg) (model:Model) =
        match msg with
        | Increment ->
            { model with count = model.count + 1}
        | Decrement ->
            { model with count = model.count - 1}

    let view model dispatch =
        div []
            [ button [ OnClick (fun _ -> dispatch Decrement) ] [ str "-" ]
              div [] [ str (sprintf "%A" model) ]
              button [ OnClick (fun _ -> dispatch Increment) ] [ str "+" ] ]

    let start (elementId:string) =
        Program.mkSimple init update view
        |> Program.withReactBatched elementId
        |> Program.run
