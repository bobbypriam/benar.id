module ArticleDetail exposing (..)

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
    { articleId : Int
    , reviews : List Review
    }


type alias Flags =
    Model


type alias Review =
    { member : Member
    , rating : Int
    , content : String
    }


type alias Member =
    { name : String
    , name_slug : String
    }


init : Flags -> ( Model, Cmd msg )
init flags =
    ( Model flags.articleId flags.reviews, Cmd.none )



-- View


view : Model -> Html Msg
view model =
    case model.reviews of
        [] ->
            p [] [ text "Tidak ada ulasan." ]

        reviews ->
            ul [] (List.map (renderReview model.articleId) reviews)


renderReview : Int -> Review -> Html Msg
renderReview articleId review =
    let
        { member, rating } =
            review
    in
        li []
            [ a [ href ("/artikel/" ++ (toString articleId) ++ "/ulasan/" ++ member.name_slug) ]
                [ text member.name
                , text " - "
                , text ((toString rating) ++ "/10")
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
