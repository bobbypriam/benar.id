module Home exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)


main : Program Flags
main =
    App.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Model


type alias Model =
    { articles : List Article }


type alias Flags =
    Model


type alias Article =
    { id : Int
    , title : String
    , url : String
    , date_created : String
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.articles, Cmd.none )



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
    = Nothing


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    ( model, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
