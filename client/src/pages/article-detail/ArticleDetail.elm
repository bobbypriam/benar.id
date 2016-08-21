port module ArticleDetail exposing (..)

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
  { article : Article }

type alias Article =
  { id : Int
  , title : String
  , url : String
  , date_created : String
  }

init : (Model, Cmd Msg)
init =
  (Model placeholderArticle, Cmd.none)

placeholderArticle : Article
placeholderArticle =
  { id = 0
  , title = ""
  , url = ""
  , date_created = ""
  }

-- View

view : Model -> Html Msg
view {article} =
  div []
    [ h3 [] [ text article.title ]
    , p [] [ text article.url ]
    , p []
      [ a [ href ("/artikel/" ++ (toString article.id) ++ "/ulasan/tulis") ]
        [ text "Tulis Ulasan" ]
      ]
    ]


-- Update

type Msg
  = NewArticle Article

update : Msg -> Model -> (Model, Cmd Msg)
update message model =
  case message of
    NewArticle article ->
      (Model article, Cmd.none)


-- Subscriptions

port article : (Article -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
  article NewArticle
