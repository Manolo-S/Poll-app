var user = $('span').html();

function categoriesFun(pollItem){
	return pollItem.categorie;
}

function pollArrFun(poll){
    var categories = poll.pollItems.map(categoriesFun);
	var arr = [poll.pollNumber, poll.pollName]
	categories.map(function(categorie){arr.push(categorie)});
	console.log('arr', arr);
	return arr;
}

function success(result){
	var userdata = result.pollData;
	console.log('success function', userdata);
	var pollsDataARR = userdata.map(pollArrFun);
	console.log('pollsDataARR',  pollsDataARR);



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
	      	return (
	      			ingredients.map(function(ingredient){return <li className="list-group-item" key={ingredient}>{ingredient}</li>})
	      		)
	      }

		  var createRecipeList = function(recipe){
		  	var collapse = "#collapse" + recipe[0];
		  	var idHeading = "heading" + recipe[0];
		  	var idCollapse = "collapse" + recipe[0];
		  	var recipeNumber = recipe[0];
		  	var recipeTitle = recipe[1]; 
		  	var ingredients = recipe.slice(2);

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
	          <h1>My Polls</h1>
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
			return {
				recipes: pollsDataARR,
				newRecipe: {recipeName: '', ingredients: ''},
				editedRecipeIndex: null
			};
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

			var pollArr = [];
			var pollData;
			this.state.recipes.forEach(function(recipe){
				var categories = recipe.slice(2, recipe.length);
				var poll = {pollNumber: recipe[0], userName: user, pollName: recipe[1], categories: categories };
				pollArr.push(poll);
			});
			pollData = {pollData: pollArr};
			console.log('pollData createpollnew', pollData)

			$.post('https://poll-app-ms.herokuapp.com/create-poll-new', pollData);

			return this.setState({recipes: this.state.recipes});
			
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
			var recipeIndex;
			var i = 1;
			var numbers = {1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six"};

			this.state.recipes.map(function(recipe, index){
				if (recipe[0] === recipeNumber){
					recipeIndex = index;
				}
			});
			this.state.recipes.splice(recipeIndex, 1)
			this.state.recipes.map(function(recipe){
				recipe[0] = numbers[i];
				i++;
			});

			var pollArr = [];
			var pollData;
			this.state.recipes.forEach(function(recipe){
				var categories = recipe.slice(2, recipe.length);
				var poll = {pollNumber: recipe[0], userName: user, pollName: recipe[1], categories: categories };
				pollArr.push(poll);
			});
			pollData = {pollData: pollArr};

			$.post('https://poll-app-ms.herokuapp.com/create-poll-new', pollData);

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
}

$.getJSON('https://poll-app-ms.herokuapp.com/userdata', {userName: user }, success);




