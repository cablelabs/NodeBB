<div class="container" id="content">

    <div class="modeling">
        <div class="row">
            <div class="col-md-5">
                <div>
                    <form class='form-horizontal'>

                        <div class="control-group">
                            <label class="control-label" for="scope">Scope Name</label>
                            <div class="controls">
                                <input class="form-control" type="text" id="scope" placeholder="Scope Name">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="name">Name</label>
                            <div class="controls">
                                <input class="form-control" type="text" id="name" placeholder="Enter Scope/Entity Name">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="tags">Tags</label>
                            <div class="controls">
                                <input class="form-control" type="text" id="tags" placeholder="CSV Tags">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="displayName">Display Name</label>
                            <div class="controls">
                                <input class="form-control" type="text" id="displayName" placeholder="Display Name">
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="definition">Swagger Path Defintion</label>
                            <div class="controls">
                                <textarea class="form-control" id="definition" rows="20" cols="50"></textarea>
                            </div>
                        </div>

                        <input type="hidden" id="uid" value="{uid}"><br />

                        <div class="form-actions">
                            <a id="submit-paths" href="#" class="btn btn-primary">Submit</a>
                        </div>

                    </form>
                </div>

                <hr class="visible-xs visible-sm"/>
            </div>
        </div>

    </div>

    <span class="hidden" id="csrf" data-csrf="{csrf}"></span>