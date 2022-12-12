<?php
	// __name__ being the prototype name, it is here the placeholder for the index in ids and names
	function getCollectionElementHtml(): string
	{
		$html = <<<EOD
    <div class="collection-elem">
        <div>
            <button class="collection-elem-add">+</button>
            <button class="collection-elem-remove">-</button>
            <button class="collection-elem-up">up</button>
            <button class="collection-elem-down">down</button>
        </div>
        <h2>This is a collection element</h2>
        <input type="text" id="form_collection___name___myinput" name="form[collection][__name__][myinput]">
        <input type="text" id="form_collection___name___myotherinput" name="form[collection][__name__][myotherinput]">
    </div>
EOD;
		return $html;
	}

	function encodeHtmlForPrototype(string $html): string
	{
		return htmlspecialchars($html);
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width">
		<title>Simple collection example without Symfony</title>
		<style>
			.collection-elem{
				border: green solid 3px;
				border-radius: 5px;
				margin-bottom: 10px;
				padding: 10px;
			}
		</style>
	</head>
	<body>
		<div id="collection-root" data-prototype="<?php echo encodeHtmlForPrototype(getCollectionElementHtml()); ?>">
		</div>
		<button id="collection-add-btn">Add element</button>
		<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="crossorigin="anonymous"></script>
		<!-- Easier to test locally with a cdn -->
		<script src="https://cdn.jsdelivr.net/gh/ruano-a/symfonyCollectionJs@4.3.1/symfonyCollectionJs.min.js"></script>
		<script>
			$(document).ready(function(){
			  $('#collection-root').formCollection({
			    other_btn_add:      '#collection-add-btn',
			    btn_add_selector:     '.collection-elem-add',
			    btn_delete_selector:  '.collection-elem-remove',
			    btn_up_selector:  '.collection-elem-up',
			    btn_down_selector:  '.collection-elem-down',
			    call_post_add_on_init:  true
			  });
			});
		</script>
	</body>
</html>
