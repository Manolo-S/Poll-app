// var user = $('p').html();
// console.log('user', user);


var RecipeDialog = React.createClass({

  render: function() {
  	
    return (
    <div>
      <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">x</button>
                    <h4 className="modal-title">{this.props.addOrEdit()} Poll</h4>
                  </div>
                  <div className="modal-body">

                   <form role="form">
            <div className="form-group">
              <label >Poll Title</label>
                      <input type="text" className="form-control" name="recipeName" onChange={this.props.onChange} placeholder="Poll Title" id="inputRecipe" value={this.props.newRecipe.recipeName}></input>
                    </div>
            <div className="form-group">
              <label htmlFor="inputIngredients">Categories</label>
              <input type="text" className="form-control" name="ingredients" onChange={this.props.onChange} placeholder="Enter categories, separated by commas" id="inputIngredients" value={this.props.newRecipe.ingredients}></input>
            </div>            
           </form>

                  </div>
                  <div className="modal-footer">
                    <input type="submit" value="Save" className="btn btn-primary" onClick={this.props.saveRecipe} data-dismiss="modal" />
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
  }
});

var RecipeList = React.createClass({
	
	render: function() {

	  var self = this;

      var createIngredientsList = function (ingredients){
      	// if (ingredients){

      	return (
      			ingredients.map(function(pollItem){
      				console.log('pollitem.categorie', pollItem.categorie);
      				return <li className="list-group-item" key={pollItem.categorie}>{pollItem.categorie}</li>})
      		)
	    }
      // }

	  var createRecipeList = function(recipe){
	  	var collapse = "#collapse" + recipe[0];
	  	var idHeading = "heading" + recipe[0];
	  	var idCollapse = "collapse" + recipe[0];
	  	var recipeNumber = recipe.pollNumber;
	  	var recipeTitle = recipe.pollName; 
	  	var ingredients = recipe.pollItems;

		return(
			  <div className = "panel panel-default" key={recipeTitle}>
			    <div className = "panel-heading" role="tab" id={idHeading}>
			      <h4 className= "panel-title">
			      <a role="button" data-toggle="collapse" data-parent="#accordion" href={collapse}>
			         {recipeTitle}</a>
			      </h4> 
			    </div>
			    <div id={idCollapse} className="panel-collapse collapse" role="tabpanel" >
			      <ul className="list-group">
			         {createIngredientsList(ingredients)}                	
             	 </ul> 
             	 <button type="button" className="btn btn-danger" onClick={self.props.deleteRecipe.bind(self, recipeNumber)} data-dismiss="modal">Delete</button>
             	 <button type="button" className="btn btn-default" onClick={self.props.editRecipe.bind(self, recipeNumber)} data-toggle="modal" data-target="#myModal">Edit</button>
			    </div> 
			  </div> 			
		);
	  };	

	  return (
        <div>
          <h1>FCC Poll App</h1>
		  <div className = "panel-group" id="accordion" role="tablist" >
		    {this.props.recipes.map(createRecipeList)}
		  </div>
		  <input type="submit" value="Add Poll" data-toggle="modal" onClick={this.props.emptyDialogBox} data-target="#myModal" className="btn btn-primary" />
		</div>
         
	  );
	}
});



var RecipeBox = React.createClass({
	getInitialState: function() {
		var i;
		var recipes = [];
		var recipeArr;
		
		for (i = 0; i < sessionStorage.length; i++){
		    recipeArr = sessionStorage.getItem(i).split(",");
		    console.log(recipeArr);
			recipes.push(recipeArr);	 
		}


		return {
			recipes: recipes,
			newRecipe: {recipeName: '', ingredients: ''},
			editedRecipeIndex: null
		};
// var recipes = [{"pollNumber" : "One", "userName" : "Manolo S", "pollName" : "city", "pollItems" : [ { "categorie" : "rome", "votes" : 0 }, { "categorie" : " porto", "votes" : 0 }, { "categorie" : " medelin", "votes" : 0 } ]}];
// 	    return {
// 				recipes: recipes,
// 				newRecipe: {recipeName: '', ingredients: ''},
// 				editedRecipeIndex: null
// 	    		};
	},

	setNewRecipeState: function(event) {
		var field = event.target.name;
		var value = event.target.value;
		this.state.newRecipe[field] = value;
		return this.setState({newRecipe: this.state.newRecipe});

	},

	saveRecipe: function() {
		console.log('saveNewRecipe');
		var numbers = {1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six"};
		var recipe = [];
		var index = 0;
        		
		if (this.state.editedRecipeIndex === null){
			var recipeNumber = this.state.recipes.length + 1;
			recipe.push(numbers[recipeNumber]);
			recipe.push(this.state.newRecipe["recipeName"]);
			var ingredients = this.state.newRecipe["ingredients"].split(",");
			ingredients.forEach(function(ingredient){recipe.push(ingredient)});
			this.state.recipes.push(recipe);
		} else {
			var index = this.state.editedRecipeIndex;
			console.log('index', index)
			var recipeNumber = index + 1;
			recipe.push(numbers[recipeNumber]);
			recipe.push(this.state.newRecipe["recipeName"]);
			var ingredients = this.state.newRecipe["ingredients"].split(",");
			ingredients.forEach(function(ingredient){recipe.push(ingredient)});
			this.state.recipes.splice(index, 1, recipe);
			this.state.editedRecipeIndex = null;
		}

		this.state.recipes.forEach(function(recipe){
			sessionStorage.setItem(index, recipe)
			console.log('index', index, 'recipe', recipe);
			console.log('sessionstorage', sessionStorage.getItem(index));
			index++;
		});

		return this.setState({recipes: this.state.recipes});
		
		// var numbers = {1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six"};
		// var recipe = [];
		// var index = 0;
        		
		// if (this.state.editedRecipeIndex === null){
		// 	var recipeNumber = this.state.recipes.length + 1;
		// 	recipe.push(numbers[recipeNumber]);
		// 	recipe.push(this.state.newRecipe["recipeName"]);
		// 	var ingredients = this.state.newRecipe["ingredients"].split(",");
		// 	ingredients.forEach(function(ingredient){recipe.push(ingredient)});
		// 	this.state.recipes.push(recipe);
		// } else {
		// 	var index = this.state.editedRecipeIndex;
		// 	console.log('index', index)
		// 	var recipeNumber = index + 1;
		// 	recipe.push(numbers[recipeNumber]);
		// 	recipe.push(this.state.newRecipe["recipeName"]);
		// 	var ingredients = this.state.newRecipe["ingredients"].split(",");
		// 	ingredients.forEach(function(ingredient){recipe.push(ingredient)});
		// 	this.state.recipes.splice(index, 1, recipe);
		// 	this.state.editedRecipeIndex = null;
		// }

		// console.log(this.state.recipes);

		// this.state.recipes.forEach(function(recipe){

		// 	console.log('recipe', recipe);
		// 	var pollNumber = recipe[0];
		// 	var pollName = recipe[1];
		// 	var categories = recipe.splice(2, recipe.length - 2);
		// 	console.log('cat', categories)
		// 	var poll = {pollNumber: pollNumber, userName: user, pollTitle: pollName, categories: categories};
		// 	console.log('poll', poll);
		//     // $.post('http://localhost:3000/create-poll-new', poll);
		// });

		//  return this.setState({recipes: this.state.recipes});
		
	},

	editRecipe: function(recipeNumber) {
		console.log('edit recipe')
		var recipeIndex
		var numbers = {"One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5, "Six": 6};
		this.state.recipes.map(function(recipe, index){
			if (recipe[0] === recipeNumber){
				recipeIndex = index;
            console.log('recipeIndex', recipeIndex)
			}
		});
		this.state.editedRecipeIndex = recipeIndex;
		console.log('edited recipe index', this.state.editedRecipeIndex)
		var recipe = this.state.recipes[recipeIndex];
		console.log(recipe[1]);
		var recipeName = recipe[1];
		var ingredients = String(recipe.splice(2));
		this.state.newRecipe["recipeName"] = recipeName;
		this.state.newRecipe["ingredients"] = ingredients; 
		return this.setState({newRecipe: this.state.newRecipe});
	},

	deleteRecipe: function(recipeNumber) {
        console.log("deleteRecipe");
		console.log("recipeNumber", recipeNumber)
		var recipeIndex;
		this.state.recipes.map(function(recipe, index){
			if (recipe[0] === recipeNumber){
				recipeIndex = index;
			}
		});
		console.log("index", recipeIndex);
		this.state.recipes.splice(recipeIndex, 1)
		return this.setState({recipes: this.state.recipes});
	},

	emptyDialogBox: function() {
		console.log("emptyDialogBox");
		this.state.newRecipe["recipeName"] = "";
		this.state.newRecipe["ingredients"] = "";
		return this.setState({newRecipe: this.state.newRecipe})
	},


    addOrEdit: function() {
		   	if (this.state.editedRecipeIndex === null) {
		  		return "Add a ";
		  	} else {
		  		return "Edit ";
		  	}
		},

	render: function() {
		return (
			<div>
			 <RecipeList recipes={this.state.recipes} emptyDialogBox={this.emptyDialogBox} deleteRecipe={this.deleteRecipe} editRecipe={this.editRecipe} />
			 <RecipeDialog onChange={this.setNewRecipeState} saveRecipe={this.saveRecipe} newRecipe={this.state.newRecipe} addOrEdit={this.addOrEdit} />
			</div>
		 );
	}
});




ReactDOM.render( <RecipeBox />, 
document.getElementById('create-poll'));



