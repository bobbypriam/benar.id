port module Home exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)


main : Program Never
main =
  App.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- Model

type alias Model =
  { articles : List Article }

type alias Article =
  { id : Int
  , title : String
  , url : String
  , date_created : String
  }

init : (Model, Cmd Msg)
init =
  (Model [], Cmd.none)


-- View

view : Model -> Html Msg
view model =
  case model.articles of
    [] ->
      p [] [ text "Tidak ada artikel." ]

    articles ->
      ul [] (List.map renderArticle articles)

renderArticle : Article -> Html Msg
renderArticle article =
  li []
    [ p []
      [ a [ href ("/artikel/" ++ (toString article.id)) ] [ strong [] [ text article.title ] ]
      , text " - "
      , a [ href article.url, target "_blank" ] [ text article.url ]
      , text " - "
      , small [] [ text article.date_created ]
      ]
    ]


-- Update

type Msg
  = NewArticles (List Article)

update : Msg -> Model -> (Model, Cmd Msg)
update message model =
  case message of
    NewArticles articles ->
      (Model (model.articles ++ articles), Cmd.none)


-- Subscriptions

port articles : (List Article -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
  articles NewArticles
