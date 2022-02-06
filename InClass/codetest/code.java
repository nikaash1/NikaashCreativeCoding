import java.lang.Math;
import java.util.List;
import java.util.ArrayList;

public class code{
    public static void main(String[]args){
        code runner = new code();
        for (int a = 0; a < 20; a = a + 4) {
            System.out.print(a + " ");
        }








    }
}


































/*

public List<String> onStreet(String st){
        int listIndex = addresses.size();
        ArrayList<String> locationsOnStreet = new ArrayList<String>();
        for(int i = 0; i < listIndex; i++){
            Address currentAddress = addresses.get(i);
            String currentStreet = currentAddress.getStreet();
            String currentLocation = currentAddress.getName();
            if(currentStreet.equals(str)){
                locationsOnStreet.add(currentLocation);
            }
        }
        return locationsOnStreet;
    }
    
    public int newBusiness(String nm, String st, int no){
        Address newBusinessAddress = new Address(nm, st, no);
        int listIndex = addresses.size();
        int loopStop = listIndex;
        boolean found = false;
        for(int i = 0; i < loopStop; i++){
            Address currentAddress = addresses.get(i);
            String currentStreet = currentAddress.getStreet();
            String currentExact = currentAddress.getNumber();
            if((currentStreet.equals(str))&&(currentExact.equals(no))){
                addresses.set(i, newBusinessAddress);
                found = true;
                loopStop = i;
            }
        }
        if(!(found)){
            addresses.add(newBusinessAddress);
        }
        return loopStop;
    }

public int lastChosen = 10;
    public String run(){
        String wordChosen;
        int loopStop = -1;
        int randomNum = (int)((Math.random())*10);
        for(int i = 0; i > loopStop; i++){
            if (randomNum == lastChosen){
                randomNum = (int)((Math.random())*10);
            }
            else{
                loopStop = i;
            }
        }
        ArrayList<String> list = new ArrayList<String>();
        list.add(0, "one");
        list.add(1, "two");
        list.add(2, "three");
        list.add(3, "four");
        list.add(4, "five");
        list.add(5, "six");
        list.add(6, "seven");
        list.add(7, "eight");
        list.add(8, "nine");
        list.add(9, "ten");
        wordChosen = list.get(randomNum);
        lastChosen = randomNum;
        return wordChosen;
    }

public String reverseWord(String word){
        int wordIndexes = (word.length()) - 1;
        String reversed = "";
        for(int i = wordIndexes; i >= 0; i--){
            char currentChar = word.charAt(i);
            reversed += currentChar;
        }
        return reversed;
    }

    public String reverseAllWords(String sentence){
        String finalString = "";
        String sentencePeriodRemoved = sentence.replace(".", "");
        boolean includesPeriod;
        if(sentence.contains(".")){
            includesPeriod = true;
        }
        else{
            includesPeriod = false;
        }
        String[] wordsList = sentencePeriodRemoved.split(" "); //create an array of each word
        int listIndexes = (wordsList.length) - 1;
        for(int k = 0; k <= listIndexes; k++){
            String reversedWordIndex = reverseWord(wordsList[k]);
            finalString += reversedWordIndex;
            if (k < listIndexes){
                finalString += " ";
            }
        }
        if(includesPeriod){
            finalString += ".";
        }
        return finalString;
    }



    public double getTotalDistance(){
        double totalDistance = 0;
        int waypointCount = (waypoints.size()) - 1;
        for(int i = 0; i < waypointCount; i++){
            Location pointA = waypoints.get(i);
            Location pointB = waypoints.get(i + 1);
            double addedDistance = pointA.distTo(pointB);
            totalDistance += addedDistance;
        }
        return totalDistance;
    }

    public double shortestDistance(){
        double shortDistance = getTotalDistance();
        int waypointCount = waypoints.size();
        for(int i = 0; i < waypointCount; i++){
            Location pointA = waypoints.get(i);
            for(int k = i + 1; k < waypointCount; k++){
                Location pointB = waypoint.get(k);
                double distance = pointA.distTo(pointB);
                if(distance < shortDistance){
                    shortDistance = distance;
                }
            }
        }
        return shortDistance;
    }
//if the player at pos is lower than their high score rank should be, move player up to correct position
private void moveUp(int pos){
    Player posPlayer = scoreboard.get(pos); //create player object that is the player at pos
    int posHighScore = posPlayer.getHighScore();
    int x = pos; //this exists to break for loop
    for(int i = 0; i < x; i++){
        Player playerAtPosition = scoreboard.get(i); //create player object that is the player at i
        int prevScore = playerAtPosition.getHighScore();
        if(posHighScore > prevScore){
            scoreboard.add(i, posPlayer); //puts posPlayer in correct position
            scoreboard.remove(pos); //removes posPlayer from its original position
            x = i; //break the loop
        }
    }
}

//adds a new score 
public boolean newScore(String name, int score){
    int playerIndex = scoreboard.size(); //position of updatedPlayer
    boolean newCreated = false;
    Player updatedPlayer = new Player(name, score); //create player object with inputted name and score
    for (int i = 0; i < playerIndex; i++){
        Player checkedPlayer = scoreboard.get(i); //create player object that is the player at i
        int checkedScore = checkedPlayer.getHighScore();
        String checkedName = checkedPlayer.getName();
        if(checkedName.equals(name)){ //if player exists, update the score
            newCreated = false;
            checkedPlayer.updateScore(score);
            scoreboard.set(i, checkedPlayer);
            playerIndex = i;
        }
        else{ //if player does not exist, a new player will be added to scoreboard
            newCreated = true;
        }
    }
    if(newCreated){ //adds new player to scoreboard
        scoreboard.add(updatedPlayer);
    }
    moveUp(playerIndex); //runs moveUp on updatedPlayer
    return newCreated;
*/